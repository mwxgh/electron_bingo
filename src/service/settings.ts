import moment from 'moment'
import * as crypto from 'crypto'

export const protectApp = (hashCode: string) => {
  const currentDateTime = moment().format('MM_YYYY')
  const dataToHash = 'NOSAH_SAFETY' + '_' + currentDateTime
  const md5 = crypto.createHash('md5').update(dataToHash).digest('hex')

  return md5 === hashCode
}
