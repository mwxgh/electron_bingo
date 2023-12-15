import Table from '@/components/Table'
import { ROUTES } from '@/constants/routes'
import { UserTableDataType } from '@/types/common/table'
import { Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { useNavigate } from 'react-router-dom'
import { userTableColumns } from '@/constants/common'
import TestListComplete from '@/components/TestListComplete'

const Step1 = () => {
  const navigate = useNavigate()

  const data: UserTableDataType[] = []
  for (let i = 1; i <= 1; i++) {
    data.push({
      key: i,
      index: i,
      code: `${i}`,
      name: 'Trần Ngọc Bình',
      factory: 'ABCDEh',
      position: 'Vận hành máy',
      completedTest: (
        <TestListComplete
          completedTest={[1, 2, 3]}
          onClick={() => {
            navigate(ROUTES.PERFORM_TEST + '/2')
          }}
        />
      ),
    })
  }

  return (
    <div>
      <Typography.Title level={5}>Tìm kiếm</Typography.Title>
      <Search style={{ width: 200 }} className="w-[300px]" size="large" />
      <Table columns={userTableColumns} data={data} className="mt-[30px]" />
    </div>
  )
}

export default Step1
