import { ROUTES } from '@/constants/routes'
import { getEntities } from '@/service/manageData'
import { useTestProgress } from '@/stores/testProgressStore'
import { Test } from '@/types/common/database'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Step2 = () => {
  const navigate = useNavigate()
  const { setTestProgress } = useTestProgress()
  const [testData, setTestData] = useState<Partial<Test>[]>([])

  const fetchTestList = async () => {
    const tests = (await getEntities('tests')) as Test[]
    const testConverted = tests.map(({ uuid, name }) => ({
      key: uuid,
      uuid,
      name,
    }))
    setTestData(testConverted)
  }

  useEffect(() => {
    fetchTestList()
  }, [])

  return (
    <div className="flex flex-wrap">
      {testData.map((item, index) => (
        <div
          key={index}
          className="bg-sky-600 hover:bg-sky-500 cursor-pointer w-[250px] py-[20px] rounded-lg mx-[20px] mb-[40px] text-xl text-white font-medium flex justify-center items-center"
          onClick={() => {
            setTestProgress(
              {
                testUuid: item.uuid,
              },
              true,
            )
            navigate(`${ROUTES.PERFORM_TEST}/${3}`)
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Step2
