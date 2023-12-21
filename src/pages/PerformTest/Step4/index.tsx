import Button from '@/components/Button'
import { createEntity } from '@/service/manageData'
import { useTestProgress } from '@/stores/testProgressStore'
import { notification } from 'antd'

function Step4() {
  const { testProgress, setTestProgress } = useTestProgress()
  const [api, contextHolder] = notification.useNotification()

  const handleSaveResult = async () => {
    try {
      await createEntity(
        {
          userUuid: testProgress.userUuid,
          details: [
            {
              testUuid: testProgress.testUuid,
              round: testProgress.round,
              answers: testProgress.answers,
            },
          ],
        },
        'testResults',
      )
      api.success({
        message: 'Lưu kết quả thành công!',
        duration: 1,
      })
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
