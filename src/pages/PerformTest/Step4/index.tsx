import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
import { errorMessages, successMessages } from '@/messages'
import { createTestResult } from '@/service/testResult'
import { useTestProgress } from '@/stores/testProgressStore'
import { typeLabels } from '@/types/common/database'
import { notification } from 'antd'
import moment from 'moment'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const Info = ({ label, text }: { label: string; text?: string | number }) => {
  return (
    <div className="mb-6">
      <p className="text-xl font-medium mb-[5px]">{label}</p>
      <p className="py-2 px-3 border-slate-300 border rounded-md w-1/2">
        {text}
      </p>
    </div>
  )
}

function Step4() {
  const { testProgress } = useTestProgress()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  const sightTime = useMemo(
    () =>
      testProgress.answers
        ?.filter((item) => item.type === 'sight')
        .reduce((sum, item) => sum + item.time, 0),
    [testProgress.answers],
  )

  const hearTime = useMemo(
    () =>
      testProgress.answers
        ?.filter((item) => item.type === 'hear')
        .reduce((sum, item) => sum + item.time, 0),
    [testProgress.answers],
  )

  const handleSaveResult = async () => {
    try {
      const { user, testUuid, round, answers } = testProgress

      if (!user || !testUuid || !round || !answers) return

      await createTestResult({
        uuid: '',
        userUuid: user.uuid,
        details: [
          {
            testUuid,
            round,
            answers,
          },
        ],
      })
      api.success({
        message: successMessages.create.testResult,
        duration: 1,
      })
      setTimeout(() => {
        navigate(ROUTES.USER)
      }, 1000)
    } catch (error) {
      api.error({
        message: errorMessages.create.testResult,
        duration: 1,
      })
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="flex">
        <div className="w-full">
          <h2 className="text-3xl mb-5 font-semibold">Thông tin</h2>
          <Info label="Mã nhân viên:" text={testProgress.user?.code} />
          <Info label="Họ và tên:" text={testProgress.user?.name} />
          <Info label="Xưởng:" text={testProgress.user?.factory} />
          <Info label="Công việc:" text={testProgress.user?.position} />
        </div>
        <div className="w-full">
          <h2 className="text-3xl mb-5">Kết quả kiểm tra</h2>
          <Info label={typeLabels.hear + ':'} text={hearTime + ' ms'} />
          <Info label={typeLabels.sight + ':'} text={sightTime + ' ms'} />
          <Info label="Ngày kiểm tra:" text={moment().format('DD/MM/YYYY')} />
          <Button onClick={handleSaveResult} className="mt-[50px]">
            Lưu kết quả
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step4
