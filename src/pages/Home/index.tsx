import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
import { useNavigate } from 'react-router-dom'
import TestIcon from '@/assets/svgs/test.svg'
import PenIcon from '@/assets/svgs/pen.svg'
import ListIcon from '@/assets/svgs/list.svg'
import SettingIcon from '@/assets/svgs/setting.svg'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center h-full">
      <ul>
        <li>
          <Button
            onClick={() => navigate(ROUTES.TEST + '/1')}
            size="large"
            icon={<TestIcon width={30} height={30} />}
            className="mt-[50px]"
          >
            Kiểm tra
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.LIST)}
            size="large"
            icon={<PenIcon width={30} height={30} />}
            className="mt-[50px]"
          >
            Tạo đề
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.LIST)}
            size="large"
            icon={<ListIcon width={30} height={30} />}
            className="mt-[50px]"
          >
            Danh sách
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.LIST)}
            size="large"
            icon={<SettingIcon width={30} height={30} />}
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
