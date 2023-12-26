/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import PlusIcon from '@/assets/svgs/plus.svg'
import Button from '@/components/Button'
import Table from '@/components/Table'
import TestListComplete from '@/components/TestListComplete'
import UserForm from '@/components/UserForm'
import { excelFileHeader, userTableColumns } from '@/constants/common'
import { ROUTES } from '@/constants/routes'
import { errorMessages, successMessages } from '@/messages'
import { exportToExcel } from '@/service/excelHelper'
import {
  bulkCreateEntity,
  createEntity,
  updateEntity,
} from '@/service/manageData'
import { deleteUsers, getUsers } from '@/service/users'
import { useTestProgress } from '@/stores/testProgressStore'
import { User } from '@/types/common/database'
import { Input, Modal, Typography, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'

const UserList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [userData, setUserData] = useState<User[]>([])
  const [api, contextHolder] = notification.useNotification()
  const [form] = useForm()
  const [action, setAction] = useState<'create' | 'update'>('create')
  const { setTestProgress } = useTestProgress()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const inputFileRef = useRef<HTMLInputElement>(null)

  const fetchUserList = async () => {
    const users = (await getUsers(keyword)) as User[]
    const userConverted = users.map((user, index) => {
      const { uuid, code, name, factory, position, testingProcess } = user
      return {
        index: index + 1,
        key: uuid,
        uuid,
        code,
        name,
        factory,
        position,
        completedTest: (
          <TestListComplete
            completedTest={testingProcess?.map(({ round }) => round) ?? []}
            onClick={(index) => {
              setTestProgress(
                {
                  user,
                  round: index,
                },
                true,
              )
              navigate(`${ROUTES.PERFORM_TEST}/${2}`)
            }}
          />
        ),
      }
    })

    setUserData(userConverted)
  }

  useEffect(() => {
    fetchUserList()
  }, [keyword])

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]

      if (file) {
        const fileName = file.name
        const fileExtension = fileName.slice(
          ((fileName.lastIndexOf('.') - 1) >>> 0) + 2,
        )

        if (fileExtension.toLowerCase() !== 'xlsx') {
          throw false
        }

        const reader = new FileReader()

        reader.onload = async (event: ProgressEvent<FileReader>) => {
          const data = event.target?.result as string

          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]

          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
          }) as any[]
          let isValidData = true

          jsonData[0].forEach((item: string, index: number) => {
            if (item !== excelFileHeader[index]) {
              isValidData = false
            }
          })

          if (!isValidData) {
            throw false
          }

          const filteredData = jsonData.filter((row: any, index: number) => {
            return row.length > 0 && index !== 0
          })

          const formattedData = filteredData.map((item: any[]) => {
            return {
              code: item[0],
              name: item[1],
              factory: item[4],
              position: item[5],
            }
          })

          await bulkCreateEntity(formattedData, 'users')

          fetchUserList()

          api.success({
            message: 'Import nhân viên thành công!',
            duration: 2,
          })
        }

        reader.readAsBinaryString(file)
      }
    } catch (error) {
      api.error({
        message: 'Import nhân viên thất bại! File không hợp lệ',
        duration: 2,
      })
      return
    } finally {
      if (inputFileRef.current) {
        inputFileRef.current.value = ''
      }
    }
  }

  const handleCreateUser = async (data: User) => {
    try {
      await createEntity(data, 'users')
      fetchUserList()
      api.success({
        message: successMessages.create.user,
        duration: 1,
      })
    } catch (error) {
      api.error({
        message: errorMessages.create.user,
        duration: 1,
      })
    }
  }

  const handleOpenUpdateModal = () => {
    const user = userData.find((user) => user.uuid === selectedRowKeys[0])
    if (!user) return

    const { code, name, factory, position } = user

    form.setFieldsValue({
      code,
      name,
      factory,
      position,
    })

    setAction('update')
    setIsOpen(true)
  }

  const handleUpdateUser = async (data: User) => {
    try {
      const user = userData.find((user) => user.uuid === selectedRowKeys[0])
      if (!user) {
        api.error({
          message: errorMessages.read.user,
          duration: 1,
        })
        return
      }

      await updateEntity('users', user?.uuid, data)
      fetchUserList()
      api.success({
        message: successMessages.update.user,
        duration: 1,
      })
    } catch (error) {
      api.error({
        message: errorMessages.update.user,
        duration: 1,
      })
    }
  }

  const handleOnDeleteUsers = async () => {
    try {
      await deleteUsers(selectedRowKeys as string[])
      setSelectedRowKeys([])
      fetchUserList()
      setIsOpenDelete(false)
      api.success({
        message: successMessages.delete.user,
        duration: 1,
      })
    } catch (error) {
      api.error({
        message: errorMessages.delete.user,
        duration: 1,
      })
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="flex justify-end mt-[30px]">
        <Button
          color="danger"
          size="medium"
          onClick={() => {
            exportToExcel(userData)
          }}
        >
          Export
        </Button>
        <Button
          size="medium"
          className="ml-[10px]"
          onClick={() => {
            if (inputFileRef.current) {
              inputFileRef.current.click()
            }
          }}
        >
          Import
        </Button>
        <input
          type="file"
          onChange={handleFileUpload}
          ref={inputFileRef}
          className="hidden"
        />
      </div>
      <Typography.Title level={5}>Tìm kiếm</Typography.Title>
      <div className="flex items-center mb-[20px] justify-between">
        <div>
          <Input.Search
            style={{ width: 300 }}
            className="w-[300px]"
            size="large"
            onSearch={(value) => {
              setKeyword(value)
            }}
          />
        </div>
        <div className="flex items-center">
          {selectedRowKeys.length > 0 && (
            <Button
              icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
              color="danger"
              className="mr-[10px]"
              onClick={() => {
                setIsOpenDelete(true)
              }}
            >
              Xóa
            </Button>
          )}
          {selectedRowKeys.length === 1 && (
            <Button
              icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
              color="warning"
              className="mr-[10px]"
              onClick={handleOpenUpdateModal}
            >
              Sửa
            </Button>
          )}
          <Button
            icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
            color="success"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            Thêm
          </Button>
        </div>
      </div>
      <Table
        data={userData}
        columns={userTableColumns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <UserForm
        title={
          action === 'create'
            ? 'Thêm nhân viên'
            : 'Cập nhật thông tin nhân viên'
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={action === 'create' ? handleCreateUser : handleUpdateUser}
        form={form}
      />
      <Modal
        open={isOpenDelete}
        onCancel={() => {
          setIsOpenDelete(false)
        }}
        footer={
          <div className="flex justify-end mt-[30px]">
            <Button color="danger" size="medium" onClick={handleOnDeleteUsers}>
              Xóa
            </Button>
            <Button size="medium" className="ml-[10px]">
              Hủy
            </Button>
          </div>
        }
        width={600}
      >
        <div className="pt-[30px]">
          <span className="text-xl">
            Bạn có chắc chắn muốn xóa các nhân viên đã chọn không?
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default UserList
