import * as fs from 'fs/promises'
import * as crypto from 'crypto'
import moment from 'moment'

export const protectApp = async (hashCode: string): Promise<boolean> => {
  try {
    const settingsJson = await fs.readFile('database/settings.json', 'utf-8')
    const { company } = JSON.parse(settingsJson)

    const currentDateTime = moment().format('MM_YYYY')
    const dataToHash = `${company}_${currentDateTime}`

    const md5 = crypto.createHash('md5').update(dataToHash).digest('hex')

    return md5 === hashCode
  } catch (error) {
    console.error('Error protecting app:', error)
    return false
  }
}
