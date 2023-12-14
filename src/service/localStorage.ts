import { LocalStoragePreset } from 'lowdb/browser'
import { LowSync } from 'lowdb'
import * as fs from 'fs/promises'
import * as crypto from 'crypto'
import moment from 'moment'

export const storage: LowSync<Storage> = LocalStoragePreset(
  'nosah_safety_local_storage',
  window.localStorage,
)

export const saveProtectAppCode = (hashCode: string) => {
  storage.read()

  if (!Object.prototype.hasOwnProperty.call(storage.data, 'hashCode')) {
    storage.data.hashCode = hashCode
  } else {
    storage.data['hashCode'] = hashCode
  }

  storage.write()
}

export const existProtectAppCode = (): string => {
  storage.read()

  return storage.data.hashCode
}

export const checkProtectAppCode = async (
  hashCode: string,
): Promise<boolean> => {
  storage.read()

  const settingsJson = await fs.readFile('database/settings.json', 'utf-8')
  const { company } = JSON.parse(settingsJson)

  const md5 = crypto
    .createHash('md5')
    .update(`${company}_${moment().format('MM_YYYY')}`)
    .digest('hex')

  const isMatch = hashCode === md5
  if (isMatch) {
    saveProtectAppCode(hashCode)

    return true
  }

  return false
}
