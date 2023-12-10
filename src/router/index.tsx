import { ROUTES } from '@/constants/routes'
import Home from '../pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import List from '@/pages/List'
import BaseLayout from '@/layouts/BaseLayout'
import TestLayout from '@/layouts/TestLayout'
import Test from '@/pages/Test'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: ROUTES.LIST,
        element: <List />,
      },
      {
        element: <TestLayout />,
        children: [
          {
            path: `${ROUTES.TEST}/:stepId`,
            element: <Test />,
          },
        ],
      },
    ],
  },
])

export default router
