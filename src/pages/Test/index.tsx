import Button from '@/components/Button'
import { Input, Typography, notification } from 'antd'
import PlusIcon from '@/assets/svgs/plus.svg'
import { useEffect, useState } from 'react'
import Table from '@/components/Table'
import { Test, TestType } from '@/types/common/database'
import { createEntity, getEntities } from '@/service/manageData'
import TestForm from '@/components/TestForm'

const data: Partial<Test>[] = []
for (let i = 1; i <= 120; i++) {
  data.push({
    name: 'Test1',
    type: TestType.hear,
    quantity: 10,
  })
}

const ListTest = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [testData, setTestData] = useState<Test[]>([])
  const [api, contextHolder] = notification.useNotification()

  const hasSelected = selectedRowKeys.length > 0

  const fetchTestList = async () => {
    const tests = (await getEntities('tests')) as Test[]
    const testConverted = tests.map(
      ({ uuid, name, type, quantity, details }, index) => ({
        index: index + 1,
        key: uuid,
        uuid,
        name,
        type,
        quantity,
        details,
      }),
    )

    setTestData(testConverted)
  }

  useEffect(() => {
    fetchTestList()
  }, [])

  const handleCreateTest = async (data: Test) => {
    try {
      await createEntity(data, 'tests')
      fetchTestList()
      api.success({
        message: 'Tạo đề kiểm tra thành công!',
        duration: 1,
      })
    } catch (error) {
      console.log(error)
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
          {hasSelected && (
            <Button
              icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
              color="danger"
              className="mr-[10px]"
            >
              Xóa
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
        data={testData}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <TestForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleCreateTest}
      />
    </div>
  )
}

export default ListTest
