import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
import { saveProtectAppCode } from '@/service/localStorage'
import { checkProtectAppCode } from '@/service/settings'
import { Input, notification } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Locked = () => {
  const navigate = useNavigate()
  const [appCode, setAppCode] = useState('')
  const [api, contextHolder] = notification.useNotification()

  const handleOnSubmit = () => {
    if (checkProtectAppCode(appCode)) {
      navigate(ROUTES.HOME)
      saveProtectAppCode(appCode)

      api.success({
        message: 'Mở khóa ứng dụng thành công!',
        duration: 1,
      })
    } else {
      api.error({
        message: 'Mã không hợp lệ!',
        duration: 1,
      })
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[500px] flex flex-col justify-center items-center">
        <h1 className="text-3xl mb-[50px] font-bold">Mở khóa ứng dụng</h1>
        <Input
          className="mb-[30px] text-xl text-center"
          onChange={(event) => {
            setAppCode(event.target.value)
          }}
        />
        <Button onClick={handleOnSubmit}>Xác nhận</Button>
      </div>
      {contextHolder}
    </div>
  )
}

export default Locked
