import { ROUTES } from '@/constants/routes'
import Home from '../pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import List from '@/pages/List'
import BaseLayout from '@/layouts/BaseLayout'

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
    ],
  },
])

export default router
