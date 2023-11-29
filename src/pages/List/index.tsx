import Button from '@/components/Button'
import { Table, Input, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import PlusIcon from '@/assets/svgs/plus.svg'
import { useState } from 'react'
import EmployeeForm from '@/components/EmployeeForm'
import TestList from '@/components/TestList'
import { setWindowTitle, checkAccessPermission } from '@/ipc/API'

interface DataType {
  key: number
  index: number
  employeeCode: string
  name: string
  factory: string
  position: string
  completedTest: React.ReactNode
}

const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'index',
    width: 60,
  },
  {
    title: 'Mã nhân viên',
    dataIndex: 'employeeCode',
    width: 120,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Xưởng',
    dataIndex: 'factory',
    width: 250,
  },
  {
    title: 'Công việc',
    dataIndex: 'position',
    width: 250,
  },
  {
    title: 'Bài test',
    dataIndex: 'completedTest',
    width: 570,
  },
]

const data: DataType[] = []
for (let i = 1; i <= 120; i++) {
  data.push({
    key: i,
    index: i,
    employeeCode: `${i}`,
    name: 'Trần Ngọc Bình',
    factory: 'ABCDEh',
    position: 'Vận hành máy',
    completedTest: <TestList completedTest={[1, 2, 3]} />,
  })
}

const { Search } = Input

const List = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <div>
      <Typography.Title level={5}>Tìm kiếm</Typography.Title>
      <div className="flex items-center mb-[20px] justify-between">
        <div>
          <Search style={{ width: 200 }} className="w-[300px]" size="large" />
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
          <Button
            icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
            color="info"
            onClick={() => {
              setWindowTitle('IPC is working !!!')
            }}
          >
            TestSetWindowTitle
          </Button>
          <Button
            icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
            color="info"
            onClick={() => {
              checkAccessPermission('5064c7f8d5f719ac6a234869515aad55')
            }}
          >
            TestMD5
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          type: 'checkbox',
        }}
        bordered
        scroll={{
          y: 550,
        }}
        tableLayout="fixed"
      />
      <EmployeeForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default List
