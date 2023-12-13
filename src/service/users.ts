import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Database, User } from '@/types/common/database'
import { JSONPreset } from 'lowdb/node'

const defaultData: Database = { users: [], tests: [], testResults: [] }
const db = await JSONPreset(join('database', 'database.json'), defaultData)

export const createUser = async (user: User) => {
  db.data.users.push({ ...user, uuid: uuidv4() })
  await db.write()
}

export const getUsers = async () => {
  await db.read()
  return db.data.users
}

export const getUserById = async (uuid: string) => {
  await db.read()
  return db.data.users.find((user) => user.uuid === uuid)
}

export const updateUser = async (uuid: string) => {
  await db.read()
  return db.data.users.find((user) => user.uuid === uuid)
}
