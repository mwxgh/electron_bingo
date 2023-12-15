import Table from '@/components/Table'
import TestList from '@/components/TestList'
import { ROUTES } from '@/constants/routes'
import { TableDataType } from '@/types/common/table'
import { Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { useNavigate } from 'react-router-dom'

const Step1 = () => {
  const navigate = useNavigate()

  const data: TableDataType[] = []
  for (let i = 1; i <= 1; i++) {
    data.push({
      key: i,
      index: i,
      employeeCode: `${i}`,
      name: 'Trần Ngọc Bình',
      factory: 'ABCDEh',
      position: 'Vận hành máy',
      completedTest: (
        <TestList
          completedTest={[1, 2, 3]}
          onClick={() => {
            navigate(ROUTES.TEST + '/2')
          }}
        />
      ),
    })
  }

  return (
    <div>
      <Typography.Title level={5}>Tìm kiếm</Typography.Title>
      <Search style={{ width: 200 }} className="w-[300px]" size="large" />
      <Table data={data} className="mt-[30px]" />
    </div>
  )
}

export default Step1
