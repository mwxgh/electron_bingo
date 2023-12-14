import { LocalStoragePreset } from 'lowdb/browser'
import { LowSync } from 'lowdb'

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

export const checkExistHashCode = (hashCode: string): boolean => {
  storage.read()

  return (
    Object.prototype.hasOwnProperty.call(storage.data, 'hashCode') &&
    storage.data.hasCode === hashCode
  )
}
