import { BrowserWindow, IpcMainEvent, dialog } from 'electron'
import * as XLSX from 'xlsx'
import os from 'os'
import * as fs from 'fs'
import * as path from 'path'

export const importUserData = async (event: IpcMainEvent) => {
  const result = await dialog.showOpenDialog(
    BrowserWindow.fromWebContents(event.sender)!,
    {
      properties: ['openFile'],
      filters: [
        { name: 'Excel Files', extensions: ['xlsx', 'xls'] },
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      defaultPath: os.homedir() + '/Downloads',
    },
  )

  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0]
    const fileExtension = path.extname(filePath).toLowerCase()

    if (fileExtension !== '.xlsx') {
      console.log('Only excel file')
    }

    try {
      const fileContent = fs.readFileSync(filePath)

      const workbook = XLSX.read(fileContent, { type: 'buffer' })

      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const data = XLSX.utils.sheet_to_json(sheet, { header: 'A' })

      console.log(data, 'data____________')
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }
}
