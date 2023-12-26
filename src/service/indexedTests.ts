/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestDetail, TestType } from '@/types/common/database'
import { IndexedDBManager } from './configIndexedDb'
import { colorCodePalette, keyBoard } from '@/constants/common'
import { shuffle } from 'lodash'

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

export const getRandomTestDetail = (
  type: TestType.hear | TestType.sight,
): TestDetail => {
  const isHear = type === TestType.hear
  const key = isHear
    ? 'Enter'
    : getRandomElement(
        keyBoard.filter((item) => item.key !== 'Enter').map((item) => item.key),
      )
  const value = isHear ? 'sound' : getRandomElement(colorCodePalette).hex

  return { type, key, value }
}

export const indexedCreateTest = (test: Test): any => {
  const halfQuantity = Math.floor(test.quantity / 2)

  let details: TestDetail[] = []
  if (test.type === TestType.hear) {
    details = Array.from({ length: test.quantity }, () =>
      getRandomTestDetail(TestType.hear),
    )
  }
  if (test.type === TestType.sight) {
    details = Array.from({ length: test.quantity }, () =>
      getRandomTestDetail(TestType.sight),
    )
  }
  if (test.type === TestType.synthetic) {
    details = shuffle(
      Array.from({ length: halfQuantity }, () =>
        getRandomTestDetail(TestType.sight),
      ).concat(
        Array.from({ length: test.quantity - halfQuantity }, () =>
          getRandomTestDetail(TestType.hear),
        ),
      ),
    )
  }

  console.log(
    { ...test, details },
    'data_to_save____________________',
    IndexedDBManager,
    IndexedDBManager.tests,
  )

  return IndexedDBManager.tests.add({ ...test, details })
}

export const indexedGetTest = (keyword: string): Promise<any> => {
  return IndexedDBManager.tests
    .where('name')
    .startsWithIgnoreCase(keyword)
    .toArray()
}
