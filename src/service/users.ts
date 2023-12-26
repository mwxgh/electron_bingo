import { User } from '@/types/common/database'
import { db } from './configDB'

export const getUsers = async (keyword?: string) => {
  db.read()
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
        user.name.toString().toLowerCase().includes(keyword.toLowerCase()) ||
        user.code.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    })

    filteredUsers.forEach(assignTestingProcessDetails)

    return filteredUsers
  } else {
    users.forEach(assignTestingProcessDetails)

    return users
  }
}

export const deleteUsers = async (userUuids: string[]): Promise<boolean> => {
  if (!userUuids || userUuids.length === 0) {
    return false
  }

  db.read()

  let usersDeleted = false

  userUuids.forEach((uuid) => {
    const userIndex = db.data.users.findIndex((user) => user.uuid === uuid)

    if (userIndex !== -1) {
      db.data.users.splice(userIndex, 1)[0]

      db.data.testResults = db.data.testResults.filter(
        (testResult) => testResult.userUuid !== uuid,
      )

      usersDeleted = true
    }
  })

  if (usersDeleted) {
    db.write()
    return true
  } else {
    return false
  }
}
