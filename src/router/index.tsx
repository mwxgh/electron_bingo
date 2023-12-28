import { ROUTES } from '@/constants/routes'
import Home from '../pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import UserList from '@/pages/UserList'
import BaseLayout from '@/layouts/BaseLayout'
import TestLayout from '@/layouts/TestLayout'
import AppLayout from '@/layouts/AppLayout'
import Locked from '@/pages/Locked'
import PerformTest from '@/pages/PerformTest'
import TestList from '@/pages/TestList'
import NotFound from '@/pages/NotFound'
import Setting from '@/pages/Setting'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.LOCKED,
        element: <Locked />,
      },
      {
        element: <BaseLayout />,
        children: [
          {
            path: ROUTES.USER,
            element: <UserList />,
          },
          {
            path: ROUTES.TEST,
            element: <TestList />,
          },
          {
            path: ROUTES.SETTING,
            element: <Setting />,
          },
          {
            element: <TestLayout />,
            children: [
              {
                path: `${ROUTES.PERFORM_TEST}/:stepId`,
                element: <PerformTest />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Home />,
      },
    ],
  },
])

export default router
