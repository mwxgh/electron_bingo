import { NUMBER_OF_TEST } from '@/constants/common'
import React from 'react'

interface Props {
  completedTest: number[]
  onClick?: (index: number) => void
}

const TestList: React.FC<Props> = ({ completedTest, onClick }) => {
  return (
    <div>
      {[...Array(NUMBER_OF_TEST)].map((_, index) => (
        <span
          className={`bg-sky-600 px-[20px] rounded-full text-white ml-[10px] ${
            completedTest.includes(index + 1)
              ? 'opacity-50 cursor-default'
              : 'hover:bg-sky-500 cursor-pointer'
          }`}
          onClick={() => {
            onClick?.(index + 1)
          }}
          key={index}
        >
          {index + 1}
        </span>
      ))}
    </div>
  )
}

export default TestList
