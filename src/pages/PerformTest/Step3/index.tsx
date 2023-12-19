import Button from '@/components/Button'
import PauseIcon from '@/assets/svgs/pause.svg'
import DoneIcon from '@/assets/svgs/done.svg'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useTestProgress } from '@/stores/testProgressStore'
import { useEffect, useRef, useState } from 'react'
import { Answer, Test, TestDetail } from '@/types/common/database'
import { getEntities, getEntityById } from '@/service/manageData'
import moment, { Duration, Moment } from 'moment'
import { keyBoard } from '@/constants/common'

const Step3 = () => {
  const { testProgress, setTestProgress } = useTestProgress()
  const [questions, setQuestions] = useState<Partial<TestDetail[]>>([])
  const [started, setStarted] = useState(false)
  const [time, setTime] = useState(0)
  const [pauseTime, setPauseTime] = useState(0)
  const [isPause, setIsPause] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const navigate = useNavigate()

  const startTimeRef = useRef<Moment | null>(null)
  const pauseTimeRef = useRef<Moment | null>(null)
  const intervalIdRef = useRef<number | null>(null)

  const fetchTestList = async () => {
    const test = (await getEntityById(
      'tests',
      testProgress.testUuid ?? '',
    )) as Test
    setQuestions(test.details)
  }

  useEffect(() => {
    fetchTestList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log('currentQuestionIndex', currentQuestionIndex)

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const currentQuestion = questions[currentQuestionIndex]

      if (event.key === currentQuestion?.key) {
        setAnswers((preAnswers) => {
          console.log('answers', [
            ...preAnswers,
            {
              type: currentQuestion.type,
              time,
            },
          ])

          return [
            ...preAnswers,
            {
              type: currentQuestion.type,
              time,
            },
          ]
        })

        nextQuestion()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, questions, time])

  const startTestTime = () => {
    setStarted(true)
    startTimeRef.current = moment()

    intervalIdRef.current = window.setInterval(() => {
      setTime(
        moment.duration(moment().diff(startTimeRef.current)).asMilliseconds(),
      )
    }, 1)
  }

  const pauseTestTime = () => {
    setIsPause(true)

    if (intervalIdRef.current !== null) {
      pauseTimeRef.current = moment()
      clearInterval(intervalIdRef.current)
    }
  }

  const stopTestTime = () => {
    setIsPause(true)

    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current)

      setTime(0)
      setPauseTime(0)
      startTimeRef.current = null
      pauseTimeRef.current = null
      intervalIdRef.current = null
    }
  }

  const resumeTestTime = () => {
    setIsPause(false)

    const currentPauseTime =
      pauseTime +
      moment.duration(moment().diff(pauseTimeRef.current)).asMilliseconds()

    setPauseTime(currentPauseTime)

    intervalIdRef.current = window.setInterval(() => {
      setTime(
        moment.duration(moment().diff(startTimeRef.current)).asMilliseconds() -
          currentPauseTime,
      )
    }, 1)
  }

  const nextQuestion = () => {
    stopTestTime()
    setCurrentQuestionIndex(currentQuestionIndex + 1)

    if (currentQuestionIndex < questions.length - 1) {
      startTestTime()
    }
  }

  if (!started) {
    return (
      <div className="px-[30px] h-full flex justify-center items-center">
        <Button color="info" className="mt-[200px]" onClick={startTestTime}>
          Bắt đầu
        </Button>
      </div>
    )
  }

  return (
    <div className="px-[30px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <span className="font-bold text-xl">Thời gian</span>
          <span>{time} ms</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-xl">Câu hỏi</span>
          <span>
            {currentQuestionIndex}/{questions.length}
          </span>
        </div>
        <div>
          {currentQuestionIndex < questions.length - 1 && (
            <Button
              size="medium"
              icon={<PauseIcon width={20} height={20} fill="white" />}
              className="mt-[50px] text-xl"
              onClick={isPause ? resumeTestTime : pauseTestTime}
            >
              {isPause ? 'Tiếp tục' : 'Tạm dừng'}
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between px-[100px] mt-[100px]">
        {keyBoard.map((item, index) => {
          const currentQuestion = questions[currentQuestionIndex]
          const color =
            item.key === currentQuestion?.key
              ? currentQuestion?.value
              : '#94a3b8'
          return (
            <div
              className={`p-[50px] hover:opacity-80 cursor-pointer text-white text-3xl rounded-md`}
              key={index}
              style={{
                background: color,
              }}
            >
              {item.key}
            </div>
          )
        })}
      </div>
      <div className="flex justify-end mt-[50px]">
        <Button
          size="medium"
          icon={<DoneIcon width={20} height={20} fill="white" />}
          className="mt-[50px] text-xl"
          onClick={() => {
            setTestProgress(
              {
                answers,
              },
              true,
            )
            navigate(`${ROUTES.PERFORM_TEST}/${4}`)
          }}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}

export default Step3
