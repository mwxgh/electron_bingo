import Button from '@/components/Button'
import { Input, Typography, notification } from 'antd'
import PlusIcon from '@/assets/svgs/plus.svg'
import { useEffect, useState } from 'react'
import EmployeeForm from '@/components/UserForm'
import TestList from '@/components/TestList'
import { TableDataType } from '@/types/common/table'
import Table from '@/components/Table'
import { User } from '@/types/common/database'
import { createEntity, getEntities } from '@/service/manageData'
import { checkProtectAppCode } from '@/service/localStorage'

const data: TableDataType[] = []
for (let i = 1; i <= 120; i++) {
  data.push({
    code: `${i}`,
    name: 'Trần Ngọc Bình',
    factory: 'ABCDEh',
    position: 'Vận hành máy',
    completedTest: <TestList completedTest={[1, 2, 3]} />,
  })
}

const ListUser = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [userData, setUserData] = useState<User[]>([])
  const [api, contextHolder] = notification.useNotification()

  const hasSelected = selectedRowKeys.length > 0

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
        completedTest: <TestList completedTest={[1, 2, 3]} />,
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
          <Button
            icon={<PlusIcon width={15} height={15} className="mr-[5px]" />}
            color="info"
            onClick={() => {
              console.log(checkProtectAppCode('aaa'))
            }}
          >
            TestConfigData
          </Button>
        </div>
      </div>
      <Table
        data={userData}
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

export default ListUser
