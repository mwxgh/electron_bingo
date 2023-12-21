import { ROUTES } from '@/constants/routes'
import { getProtectAppCode } from '@/service/localStorage'
import { checkProtectAppCode } from '@/service/settings'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

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

  return <Outlet />
}

export default AppLayout
