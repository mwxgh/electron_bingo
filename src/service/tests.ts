import { v4 as uuidv4 } from 'uuid'
import { Test } from '@/types/common/database'
import { db } from './configDB'

export const createTest = async (test: Test) => {
  const newTest = { ...test, uuid: uuidv4() }
  db.data.tests.push(newTest)
  await db.write()

  return newTest
}

export const bulkCreateTest = async (tests: Test | Test[]) => {
  const testList = Array.isArray(tests) ? tests : [tests]

  const newTests = testList.map((test) => ({ ...test, uuid: uuidv4() }))
  db.data.tests.push(...newTests)
  await db.write()

  return newTests
}

export const getTests = async (keyword?: string) => {
  await db.read()
  if (keyword) {
    const filteredTests = db.data.tests.filter((test) => {
      return test.name.toLowerCase().includes(keyword.toLowerCase())
    })

    return filteredTests
  } else {
    return db.data.tests
  }
}

export const getTestById = async (uuid: string) => {
  await db.read()
  const test = db.data.tests.find((test) => test.uuid === uuid)

  return test || null
}

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

export const deleteTest = async (uuid: string) => {
  await db.read()

  const testIndex = db.data.tests.findIndex((test) => test.uuid === uuid)

  if (testIndex !== -1) {
    db.data.tests.splice(testIndex, 1)
    await db.write()

    return true
  } else {
    return false
  }
}
