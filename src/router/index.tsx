import { ROUTES } from '@/constants/routes';
import BaseLayout from '@/layouts/BaseLayout';
import TestLayout from '@/layouts/TestLayout';
import List from '@/pages/List';
import Test from '@/pages/Test';

import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';

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
]);

export default router;
