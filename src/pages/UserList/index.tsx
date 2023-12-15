import Button from '@/components/Button'
import { Input, Modal, Typography, notification } from 'antd'
import PlusIcon from '@/assets/svgs/plus.svg'
import { useEffect, useState } from 'react'
import UserForm from '@/components/UserForm'
import { UserTableDataType } from '@/types/common/table'
import Table from '@/components/Table'
import { User } from '@/types/common/database'
import {
  bulkDeleteEntity,
  createEntity,
  getEntities,
  updateEntity,
} from '@/service/manageData'
import { useForm } from 'antd/es/form/Form'
import { userTableColumns } from '@/constants/common'
import TestListComplete from '@/components/TestListComplete'
import { errorMessages, successMessages } from '@/messages'

const data: UserTableDataType[] = []
for (let i = 1; i <= 120; i++) {
  data.push({
    code: `${i}`,
    name: 'Trần Ngọc Bình',
    factory: 'ABCDEh',
    position: 'Vận hành máy',
    completedTest: <TestListComplete completedTest={[1, 2, 3]} />,
  })
}

const UserList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [userData, setUserData] = useState<User[]>([])
  const [api, contextHolder] = notification.useNotification()
  const [form] = useForm()
  const [action, setAction] = useState<'create' | 'update'>('create')

  const fetchUserList = async () => {
    const users = (await getEntities('users')) as User[]
    const userConverted = users.map(
      ({ uuid, code, name, factory, position }, index) => ({
        index: index + 1,
        key: uuid,
        uuid,
        code,
        name,
        factory,
        position,
        completedTest: <TestListComplete completedTest={[1, 2, 3]} />,
      }),
    )

    setUserData(userConverted)
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  const handleCreateUser = async (data: User) => {
    try {
      await createEntity(data, 'users')
      fetchUserList()
      api.success({
        message: 'Tạo nhân viên thành công!',
        duration: 1,
      })
    } catch (error) {
      api.error({
        message: 'Tạo nhân viên thất bại!',
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
      await bulkDeleteEntity('users', selectedRowKeys as string[])
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
      <Typography.Title level={5}>Tìm kiếm</Typography.Title>
      <div className="flex items-center mb-[20px] justify-between">
        <div>
          <Input.Search
            style={{ width: 200 }}
            className="w-[300px]"
            size="large"
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
