import { TestResult } from '@/types/common/database'
import { db } from './configLowDB'
import { v4 as uuidv4 } from 'uuid'

export const createTestResult = async (
  data: TestResult,
): Promise<TestResult> => {
  const existingTestResult = db.data.testResults.find(
    (result) => result.userUuid === data.userUuid,
  )

  if (existingTestResult) {
    data.details.forEach((newDetail) => {
      const existingDetailIndex = existingTestResult.details.findIndex(
        (detail) => detail.round === newDetail.round,
      )

      if (existingDetailIndex !== -1) {
        existingTestResult.details[existingDetailIndex] = newDetail
      } else {
        existingTestResult.details.push(newDetail)
      }
    })

    await db.write()
    return existingTestResult
  } else {
    const newTestResult: TestResult = { ...data, uuid: uuidv4() }
    db.data.testResults.push(newTestResult)
    await db.write()
    return newTestResult
  }
}
