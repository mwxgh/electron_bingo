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

export const getUsers = async (keyword?: string) => {
  await db.read()
  if (keyword) {
    const filteredUsers = db.data.users.filter((user) => {
      return (
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.code.toLowerCase().includes(keyword.toLowerCase())
      )
    })

    return filteredUsers
  } else {
    return db.data.users
  }
}

export const getUserById = async (uuid: string) => {
  await db.read()
  const user = db.data.users.find((user) => user.uuid === uuid)

  return user || null
}

export const updateUser = async (
  uuid: string,
  updatedUserData: Partial<User>,
) => {
  await db.read()

  const userToUpdate = db.data.users.find((user) => user.uuid === uuid)

  if (userToUpdate) {
    Object.assign(userToUpdate, updatedUserData)

    await db.write()

    return userToUpdate
  } else {
    return null
  }
}

export const deleteUser = async (uuid: string) => {
  await db.read()

  const userIndex = db.data.users.findIndex((user) => user.uuid === uuid)

  if (userIndex !== -1) {
    db.data.users.splice(userIndex, 1)
    await db.write()

    return true
  } else {
    return false
  }
}
