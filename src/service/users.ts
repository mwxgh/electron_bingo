import { User } from '@/types/common/database'
import { db } from './configDB'

export const getUsers = async (keyword?: string) => {
  await db.read()
  const users = db.data.users

  const assignTestingProcessDetails = (user: User) => {
    const userTestingProcess = db.data.testResults.find(
      (testResult) => testResult.userUuid === user.uuid,
    )

    user.testingProcess = userTestingProcess ? userTestingProcess.details : []
  }

  if (keyword) {
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.code.toLowerCase().includes(keyword.toLowerCase())
      )
    })

    filteredUsers.forEach(assignTestingProcessDetails)

    return filteredUsers
  } else {
    users.forEach(assignTestingProcessDetails)

    return users
  }
}

export const getUserById = async (uuid: string) => {
  await db.read()
  const user = db.data.users.find((user) => user.uuid === uuid)

  return user || null
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
