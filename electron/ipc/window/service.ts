import { BrowserWindow, IpcMainEvent } from 'electron'
import * as fs from 'fs'
import moment from 'moment'
import * as crypto from 'crypto'

export const setWindowTitle = (event: IpcMainEvent, title: string) => {
  const webContents = event?.sender
  const win = BrowserWindow.fromWebContents(webContents)

  win?.setTitle(title)
}

export const checkAccessPermission = (
  event: IpcMainEvent,
  hashCode: string,
): boolean => {
  const data = JSON.parse(fs.readFileSync('database/settings.json', 'utf-8'))
  const currentDateTime = moment().format('MM_YYYY')
  const dataToHash = data.company + '_' + currentDateTime

  const md5 = crypto.createHash('md5').update(dataToHash).digest('hex')

  return md5 === hashCode
}
