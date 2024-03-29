import Button from '@/components/Button'
import { keyBoard, soundsSource } from '@/constants/common'
import { ROUTES } from '@/constants/routes'
import { getSettingApp } from '@/service/localStorage'
import { getEntityById } from '@/service/manageData'
import { useTestProgress } from '@/stores/testProgressStore'
import { Answer, Test, TestDetail, TestType } from '@/types/common/database'
import moment, { Moment } from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const COUNT_DOWN_TIME = 3

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
  const [soundIndex, setSoundIndex] = useState(0)
  const [countDown, setCountDown] = useState(COUNT_DOWN_TIME + 1)

  const startTimeRef = useRef<Moment | null>(null)
  const pauseTimeRef = useRef<Moment | null>(null)
  const intervalIdRef = useRef<number | null>(null)
  const audioRepeatRef = useRef<NodeJS.Timeout | null>(null)
  const countDownRef = useRef<NodeJS.Timeout | null>(null)

  const fetchTestList = async () => {
    const test = (await getEntityById(
      'tests',
      testProgress.testUuid ?? '',
    )) as Test
    setQuestions(test.details)
  }

  const fetchAppSetting = async () => {
    const settings = getSettingApp()

    setQuestionBreakTime(settings.questionBreakTime ?? 1000)
    setSoundIndex(settings.sound ?? 0)
  }

  const playAudio = useCallback(() => {
    const audio = new Audio(soundsSource[soundIndex])
    audio.play()

    if (audioRepeatRef.current) {
      clearInterval(audioRepeatRef.current)
    }

    audioRepeatRef.current = setInterval(() => {
      audio.play()
    }, 200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundIndex])

  useEffect(() => {
    fetchTestList()
    fetchAppSetting()

    return () => {
      if (audioRepeatRef.current) {
        clearInterval(audioRepeatRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex]

    if (
      currentQuestion?.type === TestType.hear &&
      started === true &&
      !isBreakTime
    ) {
      playAudio()
    }
  }, [
    currentQuestionIndex,
    questions,
    started,
    isBreakTime,
    soundIndex,
    playAudio,
  ])

  const handleOnChoseCorrectAnswer = () => {
    if (isBreakTime) return

    const currentQuestion = questions[currentQuestionIndex]

    if (currentQuestion) {
      setAnswers((preAnswers) => {
        const newAnswers = [...preAnswers]

        newAnswers[currentQuestionIndex] = {
          type: currentQuestion?.type,
          time,
        }

        return newAnswers
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

    if (intervalIdRef.current) {
      window.clearInterval(intervalIdRef.current)
    }

    intervalIdRef.current = window.setInterval(() => {
      setTime(
        moment.duration(moment().diff(startTimeRef.current)).asMilliseconds() ||
          0,
      )
    }, 1)
  }

  const pauseTestTime = () => {
    setIsPause(true)

    if (audioRepeatRef.current) {
      clearInterval(audioRepeatRef.current)
    }

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

    playAudio()

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

    if (audioRepeatRef.current) {
      clearInterval(audioRepeatRef.current)
    }

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

  const backQuestion = () => {
    stopTestTime()

    if (audioRepeatRef.current) {
      clearInterval(audioRepeatRef.current)
    }

    setTimeout(() => {
      setIsBreakTime(false)

      if (currentQuestionIndex > 0 && currentQuestionIndex !== -1) {
        startTestTime()
        setCurrentQuestionIndex(currentQuestionIndex - 1)
      }
    }, questionBreakTime)
  }

  useEffect(() => {
    if (countDownRef.current && countDown === 0) {
      clearInterval(countDownRef.current)
      startTestTime()
    }
  }, [countDown])

  const startCountDown = () => {
    setCountDown((currentCountDown) => currentCountDown - 1)

    countDownRef.current = setInterval(() => {
      setCountDown((currentCountDown) => currentCountDown - 1)
    }, 1000)
  }

  if (countDown === COUNT_DOWN_TIME + 1) {
    return (
      <div className="px-[30px] h-full flex justify-center items-center">
        <Button color="orange" className="mt-[200px]" onClick={startCountDown}>
          <span className="font-bold text-3xl text-white">Bắt đầu</span>
        </Button>
      </div>
    )
  }

  if (countDown > 0) {
    return (
      <div className="px-[30px] h-full flex justify-center items-center">
        <div className="text-[#DD6937] mt-[200px] text-5xl font-bold">
          {countDown}
        </div>
      </div>
    )
  }

  return (
    <div className="px-[30px]">
      <div className="flex items-center h-[95px]">
        <div className="flex flex-col items-start w-[33.3%] whitespace-nowrap">
          <span className="font-bold text-3xl text-white">Thời gian</span>
          <span className="text-3xl text-white">{time} ms</span>
        </div>
        <div className="flex flex-col items-center w-[33.3%]">
          <span className="font-bold text-3xl text-white">Câu hỏi</span>
          <span className="text-3xl text-white">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        <div className="w-[33.3%] flex justify-end">
          {currentQuestionIndex > 0 && currentQuestionIndex !== -1 && (
            <Button
              size="medium"
              className="text-xl w-[170px]"
              onClick={backQuestion}
            >
              Quay lại
            </Button>
          )}
          <div className="ml-4">
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
      </div>
      <div className="flex px-[100px] mt-[100px] gap-16">
        {keyBoard.map((item, index) => {
          const currentQuestion = questions[currentQuestionIndex]
          let color

          if (!currentQuestion) return

          if (item.key === currentQuestion.key) {
            if (currentQuestion.value === 'sound') {
              color = '#94a3b8'
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
              className={`p-[50px] hover:opacity-90 cursor-pointer text-white font-medium text-3xl rounded-md w-1/5 text-center`}
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
          <div className="w-full flex justify-center text-2xl text-white">
            Bạn đã hoàn thành bài kiểm tra !
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3
