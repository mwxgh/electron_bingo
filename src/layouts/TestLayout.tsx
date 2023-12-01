import Button from '@/components/Button'
import { ROUTES } from '@/constants/routes'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import HomeIcon from '@/assets/svgs/home.svg'
import { useEffect } from 'react'

const steps = [
  {
    label: 'Ghi danh',
  },
  {
    label: 'Chọn đề',
  },
  {
    label: 'Kiểm tra',
  },
  {
    label: 'Hoàn thành',
  },
]

const TestLayout = () => {
  const navigate = useNavigate()
  const params = useParams()
  const stepId = Number(params.stepId)
  const step = steps[stepId - 1]

  console.log(step)

  useEffect(() => {
    if (!stepId || !step) {
      navigate(ROUTES.NOT_FOUND, {
        replace: true,
      })
    }
  }, [])

  const renderBreadcrumb = () => {
    return (
      <div className="flex items-center">
        {steps.map((item, index) => {
          const stepIndex = index + 1

          const renderHorizontalBar = () => {
            if (stepIndex !== steps.length)
              return <div className="w-[100px] h-[2px] bg-slate-600"></div>

            return null
          }

          if (stepId < stepIndex) {
            return (
              <>
                <div className="w-[20px] h-[20px] bg-white rounded-full border-slate-600 border-[2px] flex justify-center items-center"></div>
                {renderHorizontalBar()}
              </>
            )
          }

          if (stepId === stepIndex) {
            return (
              <>
                <div className="w-[20px] h-[20px] bg-white rounded-full border-slate-600 border-[2px] flex justify-center items-center">
                  <div className="w-[10px] h-[10px] bg-slate-600 rounded-full"></div>
                </div>{' '}
                {renderHorizontalBar()}
              </>
            )
          }

          if (stepId > stepIndex) {
            return (
              <>
                <div className="w-[20px] h-[20px] bg-slate-600 rounded-full"></div>
                {renderHorizontalBar()}
              </>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div>
      <div className="p-[30px]">
        <div>
          {/* <div className="w-[20px] h-[20px] bg-slate-600 rounded-full"></div>
            <div className="w-[100px] h-[2px] bg-slate-600"></div>
            <div className="w-[20px] h-[20px] bg-white rounded-full border-slate-600 border-[2px] flex justify-center items-center">
              <div className="w-[10px] h-[10px] bg-slate-600 rounded-full"></div>
            </div>
            <div className="w-[100px] h-[2px] bg-slate-600"></div>
            <div className="w-[20px] h-[20px] bg-white rounded-full border-slate-600 border-[2px] flex justify-center items-center"></div> */}

          {renderBreadcrumb()}
        </div>
      </div>
      <div className="h-[1px] w-full bg-slate-800 opacity-20" />
      <div className="p-[30px]">
        <Outlet />
      </div>
    </div>
  )
}

export default TestLayout
