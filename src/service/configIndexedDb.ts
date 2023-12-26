import { DATABASE_NAME, DATABASE_VERSION } from '@/constants/common'
import { Test, TestResult, User } from '@/types/common/database'
import Dexie from 'dexie'

class DbManagerClass extends Dexie {
  users!: Dexie.Table<User>
  tests!: Dexie.Table<Test>
  testResults!: Dexie.Table<TestResult>

  constructor() {
    super(DATABASE_NAME)

    this.version(DATABASE_VERSION).stores({
      users: '++id,code,name,position,factory',
      tests: '++id,name,type,quantity,details',
      testResults: '++id,userId,details',
    })
  }
}

export const IndexedDBManager = new DbManagerClass()
