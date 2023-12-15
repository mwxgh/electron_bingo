/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TestType {
  hear,
  sight,
  synthetic,
}

export interface TestDetail {
  type: TestType
  keyCode: number
  code: string
  value: string
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
  details: TestDetail[]
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
