import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-full">
      <ul>
        <li>
          <Button
            onClick={() => navigate(ROUTES.LIST)}
            size="large"
            icon={<i className="fa-solid fa-flask"></i>}
            className="mt-[50px]"
          >
            Kiểm tra
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.LIST)}
            size="large"
            icon={<i className="fa-solid fa-pen-to-square"></i>}
            className="mt-[50px]"
          >
            Tạo đề
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.LIST)}
            size="large"
            icon={<i className="fa-solid fa-table-list"></i>}
            className="mt-[50px]"
          >
            Danh sách
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.LIST)}
            size="large"
            icon={<i className="fa-solid fa-sliders"></i>}
            className="mt-[50px]"
          >
            Tùy chỉnh
          </Button>
        </li>
      </ul>
    </div>
  )
}

export default Home
