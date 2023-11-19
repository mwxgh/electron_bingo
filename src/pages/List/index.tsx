import Button from '@/components/Button'
import { Table, Input, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: number
  index: number
  employeeCode: string
  name: string
  factory: string
  role: string
  testTimes: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'index',
  },
  {
    title: 'Mã nhân viên',
    dataIndex: 'employeeCode',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Xưởng',
    dataIndex: 'factory',
  },
  {
    title: 'Công việc',
    dataIndex: 'role',
  },
  {
    title: 'Lần thi',
    dataIndex: 'testTimes',
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
    role: 'Vận hành máy',
    testTimes: `${i}`,
  })
}

const { Search } = Input

const List = () => {
  return (
    <div>
      <Typography.Title level={5}>Tìm kiếm</Typography.Title>
      <div className="flex items-center mb-[20px] justify-between">
        <div>
          <Search style={{ width: 200 }} className="w-[300px]" size="large" />
        </div>
        <div>
          <Button icon={<i className="fa-solid fa-plus"></i>} color="success">
            Thêm
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ type: 'checkbox' }}
        bordered
        scroll={{
          y: 550,
        }}
      />
    </div>
  )
}

export default List
