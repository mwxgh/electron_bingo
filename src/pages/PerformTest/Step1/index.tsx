import Table from '@/components/Table'
import { ROUTES } from '@/constants/routes'
import { Typography } from 'antd'
import Search from 'antd/es/input/Search'
import { useNavigate } from 'react-router-dom'
import { userTableColumns } from '@/constants/common'
import TestListComplete from '@/components/TestListComplete'
import { useTestProgress } from '@/stores/testProgressStore'
import { getUsers } from '@/service/users'
import { User } from '@/types/common/database'
import { useEffect, useState } from 'react'
import "./style.css"

const Step1 = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<User[]>([])
  const [keyword, setKeyword] = useState('')
  const { setTestProgress } = useTestProgress()

  const fetchUser = async () => {
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
    if (keyword) {
      fetchUser()
    } else {
      setUserData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <>
      <Typography.Title
        level={5}
        style={{
          color: '#fff',
        }}
      >
        Tìm kiếm
      </Typography.Title>
      <Search
        style={{ width: 300 }}
        className="w-[300px]"
        size="large"
        onSearch={(value) => {
          setKeyword(value)
        }}
      />
      {userData.length != 0 && (
        <Table
          columns={userTableColumns}
          data={userData}
          className="mt-[30px]"
        />
      )}
    </>
  )
}

export default Step1
