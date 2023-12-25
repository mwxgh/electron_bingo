import * as crypto from 'crypto'
import moment from 'moment'
import { COMPANY } from '@/constants/common'

export const checkProtectAppCode = (hashCode: string): boolean => {
  const company = COMPANY

  const md5 = crypto
    .createHash('md5')
    .update(`${company}_${moment().format('MM_YYYY')}`)
    .digest('hex')

  return hashCode === md5
}
