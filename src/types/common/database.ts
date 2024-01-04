/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TestType {
  hear = 'hear',
  sight = 'sight',
  synthetic = 'synthetic',
}

export const typeLabels: Record<TestType, string> = {
  [TestType.hear]: 'Thính vận động',
  [TestType.sight]: 'Thị vận động',
  [TestType.synthetic]: 'Tổng hợp',
}

export interface Setting {
  minQuantityQuestion: number
  maxQuantityQuestion: number
  questionBreakTime: number
  sound: number
  [key: string]: number
}

export interface TestDetail {
  type: TestType.hear | TestType.sight
  key: string
  value: string
}

export interface Answer {
  type: TestType.hear | TestType.sight
  time: number
}

export interface User {
  uuid: string
  code: string
  name: string
  position: string
  factory: string
  testingProcess?: TestResultDetail[]
}

export interface Test {
  uuid: string
  name: string
  type: TestType
  quantity: number
  details: TestDetail[]
}

export interface TestResultDetail {
  round: number
  testUuid: string
  answers: Answer[]
}

export interface TestResult {
  uuid: string
  userUuid: string
  details: TestResultDetail[]
}

export interface Database {
  users: User[]
  tests: Test[]
  testResults: TestResult[]
}

export interface DataToExport {
  index: number
  code: string
  name: string
  factory: string
  position: string
  round1: number[]
  round2: number[]
  round3: number[]
  round4: number[]
  round5: number[]
  round6: number[]
  round7: number[]
  round8: number[]
  round9: number[]
  [key: string]: any
}

export interface IndexedDataUser {
  index: number
  code: string
  name: string
  position: string
  factory: string
  testingProcess?: TestResultDetail[] | undefined
}

export interface DataUserClassified extends IndexedDataUser {
  testingProcess: TestResultDetail[]
}
