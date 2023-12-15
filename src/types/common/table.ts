import { TestType } from './database'

export interface UserTableDataType {
  key?: number
  index?: number
  code: string
  name: string
  factory: string
  position: string
  completedTest: React.ReactNode
}

export interface TestTableDataType {
  key?: number
  index?: number
  name: string
  type: TestType
  quantity: number
}
