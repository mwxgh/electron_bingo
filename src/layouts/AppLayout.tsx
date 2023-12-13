import { ROUTES } from '@/constants/routes'
import { protectApp } from '@/service/settings'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AppLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAppLocked = async () => {
      const result = await protectApp('e199e161bb28885b5ab4a54daadb8029')

      if (!result) {
        navigate(ROUTES.LOCKED)
      }
    }
    checkAppLocked()
  }, [])

  return <Outlet />
}

export default AppLayout
