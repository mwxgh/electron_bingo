import { LocalStoragePreset } from 'lowdb/browser'
import { LowSync } from 'lowdb'
import { Setting } from '@/types/common/database'

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

export const getProtectAppCode = (): string => {
  storage.read()

  return storage.data.hashCode
}

export const saveSettingApp = (data: Setting) => {
  storage.read()

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      storage.data[key] = data[key]
    }
  }

  storage.write()
}

export const getSettingApp = (): Setting => {
  storage.read()

  return {
    minQuantityQuestion: storage.data.minQuantityQuestion,
    maxQuantityQuestion: storage.data.maxQuantityQuestion,
    questionBreakTime: storage.data.questionBreakTime,
  }
}
