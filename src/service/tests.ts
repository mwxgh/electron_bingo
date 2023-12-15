import { v4 as uuidv4 } from 'uuid'
import { Test, TestDetail, TestType } from '@/types/common/database'
import { db } from './configDB'
import { colorCodePalette, keyBoard } from '@/constants/common'
import { shuffle } from 'lodash'

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

export const getRandomTestDetail = (
  type: TestType.hear | TestType.sight,
): TestDetail => {
  const isHear = type === TestType.hear
  const keyCode = isHear
    ? 13
    : getRandomElement(
        keyBoard
          .filter((item) => item.keyCode !== 13)
          .map((item) => item.keyCode),
      )
  const value = isHear ? 'sound' : getRandomElement(colorCodePalette).hex

  return { type, keyCode, value }
}

export const createTest = async (test: Test): Promise<Test> => {
  const newTest: Test = { ...test, uuid: uuidv4(), details: [] }
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

  newTest.details = details

  db.data.tests.push(newTest)
  await db.write()

  return newTest
}

// if quantity less or more than before -> custom update test for modify details
export const updateTest = async (
  uuid: string,
  updatedTestData: Partial<Test>,
) => {
  await db.read()

  const testToUpdate = db.data.tests.find((test) => test.uuid === uuid)

  if (testToUpdate) {
    Object.assign(testToUpdate, updatedTestData)

    await db.write()

    return testToUpdate
  } else {
    return null
  }
}
