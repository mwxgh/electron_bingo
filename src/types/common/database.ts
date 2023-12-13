/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TestType {
  hear,
  sight,
}

export interface User {
  uuid: string
  code: string
  name: string
  position: string
  factory: string
}

export interface Test {
  uuid: string
  name: string
  type: TestType
  quantity: number
  detail: any
}

export interface TestResult {
  uuid: string
  userUuid: string
  testUuid: string
  detail: any
}

export interface Database {
  users: User[]
  tests: Test[]
  testResults: TestResult[]
}
