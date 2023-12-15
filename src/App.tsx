import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider } from 'antd'
import { validateMessages } from '@/messages/index'

function App() {
  return (
    <>
      <ConfigProvider form={{ validateMessages: validateMessages }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  )
}

export default App
