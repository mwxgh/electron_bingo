import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
import { Outlet, useNavigate } from 'react-router-dom'

const BaseLayout = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="p-[30px]">
        <Button
          icon={<i className="fa-solid fa-house"></i>}
          onClick={() => {
            navigate(ROUTES.HOME)
          }}
        >
          Về màn hình chính
        </Button>
      </div>
      <div className="h-[1px] w-full bg-slate-800 opacity-20"/>
      <div className="p-[30px]">
        <Outlet />
      </div>
    </div>
  )
}

export default BaseLayout
