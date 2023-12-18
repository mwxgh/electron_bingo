import { db } from './configDB'

export const getUsers = async (keyword?: string) => {
  await db.read()
  const users = db.data.users

  const userUuids = users.map((user) => user.uuid)

  for (const userUuid of userUuids) {
    const testResults = db.data.testResults.filter(
      (testResult) => testResult.userUuid === userUuid,
    )
    const userIndex = users.findIndex((user) => user.uuid === userUuid)

    if (userIndex !== -1) {
      users[userIndex].testingProcess = testResults
    }
  }

  if (keyword) {
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.code.toLowerCase().includes(keyword.toLowerCase())
      )
    })

    return filteredUsers
  } else {
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
