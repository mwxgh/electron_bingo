import Button from '@/components/Button'
import PauseIcon from '@/assets/svgs/pause.svg'
import DoneIcon from '@/assets/svgs/done.svg'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const Step3 = () => {
  const navigate = useNavigate()

  const data = []
  for (let i = 1; i <= 5; i++) {
    data.push({
      key: i,
      index: i,
      label: i,
    })
  }

  return (
    <div className="px-[30px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <span className="font-bold text-xl">Thời gian</span>
          <span>123 ms</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-xl">Câu hỏi</span>
          <span>1/10</span>
        </div>
        <div>
          <Button
            size="medium"
            icon={<PauseIcon width={20} height={20} fill="white" />}
            className="mt-[50px] text-xl"
          >
            Tạm dừng
          </Button>
        </div>
      </div>
      <div className="flex justify-between px-[100px] mt-[100px]">
        {data.map((item) => (
          <div className="p-[50px] bg-sky-600 hover:bg-sky-500 cursor-pointer text-white text-3xl rounded-md">
            {item.label}
          </div>
        ))}
      </div>
      <div className='flex justify-end mt-[50px]'>
        <Button
          size="medium"
          icon={<DoneIcon width={20} height={20} fill="white" />}
          className="mt-[50px] text-xl"
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}

export default Step3
