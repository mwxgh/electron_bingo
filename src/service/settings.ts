// import * as fs from 'fs'
import * as crypto from 'crypto'
import moment from 'moment'
// import { Setting } from '@/types/common/database'

export const checkProtectAppCode = (hashCode: string): boolean => {
  // const settingsJson = fs.readFileSync('database/settings.json', 'utf-8')e
  // const { company } = JSON.parse(settingsJson)

  const company = 'NOSAH_SAFETY'
  const md5 = crypto
    .createHash('md5')
    .update(`${company}_${moment().format('MM_YYYY')}`)
    .digest('hex')

  return hashCode === md5
}

// export const getSettingAppDefault = (): Setting => {
//   const settingsJson = fs.readFileSync('database/settings.json', 'utf-8')
//   const { questionBreakTime, minQuantityQuestion, maxQuantityQuestion } =
//     JSON.parse(settingsJson)

//   return {
//     questionBreakTime,
//     minQuantityQuestion,
//     maxQuantityQuestion,
//   }
// }
