import { NUMBER_OF_TEST } from '@/constants/common'
import React from 'react'

interface Props {
  completedTest: number[]
}

const TestList: React.FC<Props> = ({ completedTest }) => {
  return (
    <div>
      {[...Array(NUMBER_OF_TEST)].map((_, index) => (
        <span
          className={`bg-sky-600 px-[20px] rounded-full text-white ml-[10px] ${
            completedTest.includes(index + 1)
              ? 'opacity-50 cursor-default'
              : 'hover:bg-sky-500 cursor-pointer'
          }`}
          onClick={() => {}}
        >
          {index + 1}
        </span>
      ))}
    </div>
  )
}

export default TestList
