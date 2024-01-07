/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/components/Button'
import { Input, Modal, Typography, notification } from 'antd'
import PlusIcon from '@/assets/svgs/plus.svg'
import { useEffect, useState } from 'react'
import Table from '@/components/Table'
import { Test, TestType, typeLabels } from '@/types/common/database'
import {
  bulkDeleteEntity,
  getEntities,
  updateEntity,
} from '@/service/manageData'
import { useForm } from 'antd/es/form/Form'
import { testTableColumns } from '@/constants/common'
import TestForm from '@/components/TestForm'
import { errorMessages, successMessages } from '@/messages'
import { createTest } from '@/service/tests'
import { swapKeysAndValues } from '@/utils/common'

const TestList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [testData, setTestData] = useState<Test[]>([])
  const [api, contextHolder] = notification.useNotification()
  const [form] = useForm()
  const [action, setAction] = useState<'create' | 'update'>('create')
  const [keyword, setKeyword] = useState('')

  const fetchTestList = async () => {
    const tests = (await getEntities('tests', keyword)) as Test[]
    const testConverted = tests.map(
      ({ uuid, name, type, quantity, details }, index) => ({
        index: index + 1,
        key: uuid,
        uuid,
        name,
        type: typeLabels[type] as TestType,
        quantity,
        details,
      }),
    )
    setTestData(testConverted)
  }

  useEffect(() => {
    fetchTestList()
  }, [keyword])

  const handleCreateTest = async (data: Test) => {
    try {
      await createTest(data)
      fetchTestList()
      api.success({
        message: successMessages.create.test,
        duration: 1,
      })
    } catch (error) {
      api.error({
        message: errorMessages.create.test,
        duration: 1,
      })
    }
  }

  const handleOpenUpdateModal = () => {
    const test = testData.find((test) => test.uuid === selectedRowKeys[0])

    if (!test) return

    const { name, type, quantity, details } = test

    form.setFieldsValue({
      name,
      type: swapKeysAndValues(typeLabels)[type],
      quantity,
      details,
    })

    setAction('update')
    setIsOpen(true)
  }

  const handleUpdateTest = async (data: Test) => {
    try {
      const test = testData.find((test) => test.uuid === selectedRowKeys[0])
      if (!test) {
        api.error({
          message: errorMessages.read.test,
          duration: 1,
        })
        return
      }

      await updateEntity('tests', test?.uuid, data)
      fetchTestList()
      api.success({
        message: successMessages.update.test,
        duration: 1,
      })
    } catch (error) {
      api.error({
        message: errorMessages.update.test,
        duration: 1,
      })
    }
  }

  const handleOnDeleteTests = async () => {
    try {
      await bulkDeleteEntity('tests', selectedRowKeys as string[])
      setSelectedRowKeys([])
      fetchTestList()
      setIsOpenDelete(false)
      api.success({
        message: successMessages.delete.test,
        duration: 1,
      })
    } catch (error) {
      api.error({
        message: errorMessages.delete.test,
        duration: 1,
      })
    }
  }

  return (
    <div>
      {contextHolder}
      <Typography.Title level={5} style={{ color: '#fff' }}>
        Tìm kiếm
      </Typography.Title>
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
              form.resetFields()
              setAction('create')
            }}
          >
            Thêm
          </Button>
        </div>
      </div>
      <Table
        data={testData}
        columns={testTableColumns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <TestForm
        title={
          action === 'create'
            ? 'Thêm đề kiểm tra'
            : 'Cập nhật thông tin đề kiểm tra'
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCreate={action === 'create'}
        onSubmit={action === 'create' ? handleCreateTest : handleUpdateTest}
        form={form}
      />
      <Modal
        open={isOpenDelete}
        onCancel={() => {
          setIsOpenDelete(false)
        }}
        footer={
          <div className="flex justify-end mt-[30px]">
            <Button color="danger" size="medium" onClick={handleOnDeleteTests}>
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
          <span className="text-xl text-white">
            Bạn có chắc chắn muốn xóa các đề kiểm tra đã chọn không?
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default TestList
