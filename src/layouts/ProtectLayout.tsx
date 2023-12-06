import Button from '@/components/Button'
import { Input } from 'antd'
import { checkAccessPermission } from '@/ipc/API'

const ProtectLayout = () => {
  const checkPermission = () => {
    console.log('her1', checkAccessPermission('sdfds'))
  }
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[500px] flex flex-col justify-center items-center">
        <h1 className="text-3xl mb-[50px] font-bold">Mở khóa ứng dụng</h1>
        <Input className="mb-[30px] text-xl text-center" />
        <Button onClick={checkPermission}>Xác nhận </Button>
      </div>
    </div>
  )
}

export default ProtectLayout
