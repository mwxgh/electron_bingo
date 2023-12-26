import * as crypto from 'crypto'
import moment from 'moment'
import { COMPANY } from '@/constants/common'

export const checkProtectAppCode = (hashCode: string): boolean => {
  const md5 = crypto
    .createHash('md5')
    .update(`${COMPANY}_${moment().format('MM_YYYY')}`)
    .digest('hex')

  return hashCode === md5
}
