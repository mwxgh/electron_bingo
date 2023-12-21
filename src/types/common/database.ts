/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TestType {
  hear = 'hear',
  sight = 'sight',
  synthetic = 'synthetic',
}

export const typeLabels: Record<TestType, string> = {
  [TestType.hear]: 'Thính vận động',
  [TestType.sight]: 'Thị vận động',
  [TestType.synthetic]: 'Đề tổng hợp',
}

export interface Setting {
  minQuantityQuestion: number
  maxQuantityQuestion: number
  questionBreakTime: number
  [key: string]: number;
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
