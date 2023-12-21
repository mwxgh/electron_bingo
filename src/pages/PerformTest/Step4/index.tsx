import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
// import { ROUTES } from '@/constants/routes'
import { createTestResult } from '@/service/testResult'
import { useTestProgress } from '@/stores/testProgressStore'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

function Step4() {
  const { testProgress, setTestProgress } = useTestProgress()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  const handleSaveResult = async () => {
    try {
      const { userUuid, testUuid, round, answers } = testProgress

      if (!userUuid || !testUuid || !round || !answers) return

      await createTestResult({
        uuid: '',
        userUuid,
        details: [
          {
            testUuid,
            round,
            answers,
          },
        ],
      })
      api.success({
        message: 'Lưu kết quả thành công!',
        duration: 1,
      })
      setTimeout(() => {
        navigate(ROUTES.USER)
      }, 2000)
    } catch (error) {
      api.error({
        message: 'Lưu kết quả thất bại!',
        duration: 1,
      })
    }
  }

  return (
    <div>
      {contextHolder}
      <div>Step4</div>
      <Button onClick={handleSaveResult}>Lưu</Button>
    </div>
  )
}

export default Step4
