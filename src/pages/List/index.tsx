import Button from '@/components/Button'
import { Input, Typography } from 'antd'
import PlusIcon from '@/assets/svgs/plus.svg'
import { useState } from 'react'
import EmployeeForm from '@/components/EmployeeForm'
import TestList from '@/components/TestList'
import { TableDataType } from '@/types/common/table'
import Table from '@/components/Table'
import { createUser, getUsers } from '@/service/users'
import { User } from '@/types/common/database'

const data: TableDataType[] = []
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

const List = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const hasSelected = selectedRowKeys.length > 0

  const handleCreateUser = (data: User) => {
    createUser(data)
  }

  return (
    <div>
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
          <Button
            icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
            color="info"
            onClick={() => {
              console.log(getUsers())
            }}
          >
            TestConfigData
          </Button>
        </div>
      </div>
      <Table
        data={data}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <EmployeeForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleCreateUser}
      />
    </div>
  )
}

export default List
