import { ROUTES } from '@/constants/routes'
import { getProtectAppCode } from '@/service/localStorage'
import { checkProtectAppCode } from '@/service/settings'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '@/assets/image/logo.png'

const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAppLocked = async () => {
      const appCode = await getProtectAppCode()

      if (!appCode || !checkProtectAppCode(appCode)) {
        navigate(ROUTES.LOCKED)
      }
    }
    checkAppLocked()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.href])

  return (
    <div className="relative bg-gradient-to-br from-blue-400 to-blue-900 min-h-screen">
      <img
        src={Logo}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
      />
      <div className="relative z-1 grow">
        <Outlet />
      </div>
      <p className='absolute bottom-[15px] right-[15px] text-white'>Phần mềm thuộc sở hữu của Công ty Cổ phần Truyền thông và Dịch vụ An toàn vệ sinh lao động Quốc Gia</p>
    </div>
  )
}

export default AppLayout
