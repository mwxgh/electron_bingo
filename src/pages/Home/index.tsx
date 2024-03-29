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
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-white font-bold text-4xl text-center mb-[20px] w-[800px] absolute top-[60px]">
        CÔNG TY CỔ PHẦN TRUYỀN THÔNG VÀ DỊCH VỤ AN TOÀN VỆ SINH LAO ĐỘNG QUỐC
        GIA
      </p>
      <ul>
        <li>
          <Button
            onClick={() => navigate(ROUTES.PERFORM_TEST + '/1')}
            size="large"
            icon={<TestIcon width={30} height={30} />}
          >
            Kiểm tra
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.TEST)}
            size="large"
            icon={<PenIcon width={30} height={30} />}
            className="mt-[50px]"
          >
            Đề kiểm tra
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.USER)}
            size="large"
            icon={<ListIcon width={30} height={30} />}
            className="mt-[50px]"
          >
            Nhân viên
          </Button>
        </li>
        <li>
          <Button
            onClick={() => navigate(ROUTES.SETTING)}
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
