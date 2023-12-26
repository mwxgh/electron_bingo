import { Database } from '@/types/common/database'
import { JSONSyncPreset } from 'lowdb/node'

const defaultData: Database = { users: [], tests: [], testResults: [] }

export const db = JSONSyncPreset('database/database.json', defaultData)
