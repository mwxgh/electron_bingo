import { join } from 'path'
import { Database } from '@/types/common/database'
import { JSONPreset } from 'lowdb/node'

const defaultData: Database = { users: [], tests: [], testResults: [] }

export const db = await JSONPreset(
  join('database', 'database.json'),
  defaultData,
)
