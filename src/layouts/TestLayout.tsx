import { ROUTES } from '@/constants/routes'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
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

  useEffect(() => {
    if (!stepId || !step) {
      navigate(ROUTES.NOT_FOUND, {
        replace: true,
      })
    }
  }, [])

  const renderBreadcrumb = () => {
    return (
      <div className="flex items-center relative">
        {steps.map((item, index) => {
          const stepIndex = index + 1

          const handleOnClick = () => {
            if (stepIndex >= stepId) return
            navigate(`${ROUTES.TEST}/${stepIndex}`)
          }

          const renderHorizontalBar = () => {
            if (stepIndex !== steps.length)
              return <div className="w-[150px] h-[2px] bg-slate-600"></div>

            return null
          }

          if (stepId < stepIndex) {
            return (
              <>
                <div className="relative">
                  <div
                    className="w-[20px] h-[20px] bg-white rounded-full border-slate-600 border-[2px] flex justify-center items-center cursor-pointer"
                    onClick={handleOnClick}
                  ></div>
                  <div
                    className="absolute whitespace-nowrap left-1/2 -translate-x-1/2 top-[25px] cursor-pointer"
                    onClick={handleOnClick}
                  >
                    {item.label}
                  </div>
                </div>
                {renderHorizontalBar()}
              </>
            )
          }

          if (stepId === stepIndex) {
            return (
              <>
                <div className="relative">
                  <div
                    className="w-[20px] h-[20px] bg-white rounded-full border-slate-600 border-[2px] flex justify-center items-center cursor-pointer"
                    onClick={handleOnClick}
                  >
                    <div className="w-[10px] h-[10px] bg-slate-600 rounded-full"></div>
                  </div>
                  <div
                    className="absolute whitespace-nowrap left-1/2 -translate-x-1/2 top-[25px] cursor-pointer"
                    onClick={handleOnClick}
                  >
                    {item.label}
                  </div>
                </div>
                {renderHorizontalBar()}
              </>
            )
          }

          if (stepId > stepIndex) {
            return (
              <>
                <div className="relative">
                  <div
                    className="w-[20px] h-[20px] bg-slate-600 rounded-full cursor-pointer"
                    onClick={handleOnClick}
                  ></div>
                  <div
                    className="absolute whitespace-nowrap left-1/2 -translate-x-1/2 top-[25px] cursor-pointer"
                    onClick={handleOnClick}
                  >
                    {item.label}
                  </div>
                </div>
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
      <div className="p-[30px]">{renderBreadcrumb()}</div>
      <div className="h-[1px] w-full bg-slate-800 opacity-20" />
      <div className="p-[30px]">
        <Outlet />
      </div>
    </div>
  )
}

export default TestLayout
