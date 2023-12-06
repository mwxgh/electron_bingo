import { ROUTES } from '@/constants/routes'
import Home from '../pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import List from '@/pages/List'
import BaseLayout from '@/layouts/BaseLayout'
import TestLayout from '@/layouts/TestLayout'
import Test from '@/pages/Test'
// import ProtectLayout from '@/layouts/ProtectLayout'

const router = createBrowserRouter([
  {
    // path: ROUTES.ENTRY,
    // element: <ProtectLayout />,
    children: [
      {
        path: ROUTES.ENTRY,
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
            path: `${ROUTES.TEST}/:stepId`,
            element: <TestLayout />,
            children: [
              {
                element: <Test />,
              },
            ],
          },
        ],
      },
    ],
  },
])

export default router
