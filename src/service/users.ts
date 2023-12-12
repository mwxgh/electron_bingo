import { JSONPreset } from 'lowdb/node'

// Read or create db.json
const defaultData = { users: [], tests: [], testResults: [] }
const db = await JSONPreset('database/database.json', defaultData)

export const createUser = async (user: never) => {
  db.data.users.push(user)
  await db.write()
}
