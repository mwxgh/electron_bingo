import { ROUTES } from '@/constants/routes'
import Home from '../pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import ListUser from '@/pages/User'
import BaseLayout from '@/layouts/BaseLayout'
import TestLayout from '@/layouts/PerformTestLayout'
import PerformTest from '@/pages/PerformTest'
import AppLayout from '@/layouts/AppLayout'
import Locked from '@/pages/Locked'
import ListTest from '@/pages/Test'

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
            element: <ListUser />,
          },
          {
            path: ROUTES.TEST,
            element: <ListTest />,
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
    ],
  },
])

export default router
