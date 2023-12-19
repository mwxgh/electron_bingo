import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <span className="text-3xl font-semibold mb-[50px]">Đã xảy ra lỗi!</span>
      <Button
        onClick={() => {
          navigate(ROUTES.HOME)
        }}
      >
        Về màn hình chính
      </Button>
    </div>
  )
}

export default NotFound
