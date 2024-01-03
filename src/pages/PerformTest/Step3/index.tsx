import Button from '@/components/Button'
import { keyBoard } from '@/constants/common'
import { ROUTES } from '@/constants/routes'
import { getSettingApp } from '@/service/localStorage'
import { getEntityById } from '@/service/manageData'
import { useTestProgress } from '@/stores/testProgressStore'
import { Answer, Test, TestDetail, TestType } from '@/types/common/database'
import moment, { Moment } from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sound from '@/assets/sound/sound1.mp3'

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
  const [isBreakTime, setIsBreakTime] = useState(false)
  const [questionBreakTime, setQuestionBreakTime] = useState(1000)

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

  const fetchAppSetting = async () => {
    const settings = await getSettingApp()

    setQuestionBreakTime(settings.questionBreakTime ?? 1000)
  }

  useEffect(() => {
    fetchTestList()
    fetchAppSetting()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex]

    if (
      currentQuestion?.type === TestType.hear &&
      started === true &&
      !isBreakTime
    ) {
      const audio = new Audio(sound)
      audio.play()
    }
  }, [currentQuestionIndex, questions, started, isBreakTime])

  const handleOnChoseCorrectAnswer = () => {
    if (isBreakTime) return

    const currentQuestion = questions[currentQuestionIndex]

    if (currentQuestion) {
      setAnswers((preAnswers) => {
        return [
          ...preAnswers,
          {
            type: currentQuestion?.type,
            time,
          },
        ]
      })
      setIsBreakTime(true)

      nextQuestion()
    }
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const currentQuestion = questions[currentQuestionIndex]

      if (event.key === currentQuestion?.key) {
        handleOnChoseCorrectAnswer()
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
    setIsPause(false)

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
      if (!isBreakTime) {
        setTime(
          moment
            .duration(moment().diff(startTimeRef.current))
            .asMilliseconds() - currentPauseTime,
        )
      }
    }, 1)
  }

  const nextQuestion = () => {
    stopTestTime()

    setTimeout(() => {
      setIsBreakTime(false)

      if (currentQuestionIndex < questions.length - 1) {
        startTestTime()
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setCurrentQuestionIndex(-1)
      }
    }, questionBreakTime)
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
      <div className="flex justify-between items-center h-[95px]">
        <div className="flex flex-col items-center">
          <span className="font-bold text-3xl">Thời gian</span>
          <span className="text-3xl">{time} ms</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-3xl">Câu hỏi</span>
          <span className="text-3xl">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        <div className="w-[174.14px]">
          {questions[currentQuestionIndex] ? (
            <Button
              size="medium"
              className="text-xl w-[170px]"
              onClick={isPause ? resumeTestTime : pauseTestTime}
            >
              {isPause ? 'Tiếp tục' : 'Tạm dừng'}
            </Button>
          ) : (
            <Button
              size="medium"
              className="text-xl w-[170px]"
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
          )}
        </div>
      </div>
      <div className="flex justify-between px-[100px] mt-[100px]">
        {keyBoard.map((item, index) => {
          const currentQuestion = questions[currentQuestionIndex]
          let color

          if (!currentQuestion) return

          if (item.key === currentQuestion.key) {
            if (currentQuestion.value === 'sound') {
              color = '#0ea5e9'
            } else {
              color = currentQuestion.value
            }
          } else {
            color = '#94a3b8'
          }

          if (isBreakTime) {
            color = '#94a3b8'
          }

          return (
            <div
              className={`p-[50px] hover:opacity-80 cursor-pointer text-white text-3xl rounded-md`}
              key={index}
              style={{
                background: color,
              }}
              onClick={() => {
                if (item.key === currentQuestion.key) {
                  handleOnChoseCorrectAnswer()
                }
              }}
            >
              {item.key}
            </div>
          )
        })}

        {!questions[currentQuestionIndex] && (
          <div className="w-full flex justify-center text-2xl">
            Bạn đã hoàn thành bài kiểm tra !
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3
