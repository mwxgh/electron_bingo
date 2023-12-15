import { ROUTES } from '@/constants/routes'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { testSteps } from '@/constants/common'

const PerformTestLayout = () => {
  const navigate = useNavigate()
  const params = useParams()
  const stepId = Number(params.stepId)
  const step = testSteps[stepId - 1]

  useEffect(() => {
    if (!stepId || !step) {
      navigate(ROUTES.NOT_FOUND, {
        replace: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderBreadcrumb = () => {
    return (
      <div className="flex items-center relative">
        {testSteps.map((item, index) => {
          const stepIndex = index + 1

          const handleOnClick = () => {
            if (stepIndex >= stepId) return
            navigate(`${ROUTES.TEST}/${stepIndex}`)
          }

          const renderHorizontalBar = () => {
            if (stepIndex !== testSteps.length)
              return <div className="w-[150px] h-[2px] bg-slate-600"></div>

            return null
          }

          if (stepId < stepIndex) {
            return (
              <>
                <div className="relative" key={index}>
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
                <div className="relative" key={index}>
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
                <div className="relative" key={index}>
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
      <div className="mb-[70px] px-[25px] mt-[20px]">{renderBreadcrumb()}</div>
      {/* <div className="h-[1px] w-full bg-slate-800 opacity-20" /> */}
      <Outlet />
    </div>
  )
}

export default PerformTestLayout
