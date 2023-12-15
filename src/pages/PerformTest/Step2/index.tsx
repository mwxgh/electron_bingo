import { ROUTES } from '@/constants/routes'
import { useNavigate } from 'react-router-dom'

const Step2 = () => {
  const navigate = useNavigate()

  const data = []
  for (let i = 1; i <= 10; i++) {
    data.push({
      key: i,
      index: i,
      label: `Đề ${i}`,
      onClick: () => {
        navigate(ROUTES.TEST + '/3')
      },
    })
  }

  return (
    <div className="flex flex-wrap">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-sky-600 hover:bg-sky-500 cursor-pointer w-[250px] py-[20px] rounded-lg mx-[20px] mb-[40px] text-xl text-white font-medium flex justify-center items-center"
          onClick={item.onClick}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}

export default Step2
