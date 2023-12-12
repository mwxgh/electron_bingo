/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx'
import * as fs from 'fs'

class ExcelService {
  saveUser = (data: { [key: string]: any }) => {
    console.log(data)
    const file = fs.readFileSync('database/database.xlsx')

    const wb = XLSX.read(file, { type: 'buffer' })

    const ws = wb.Sheets['users']
    const lastRow = ws.lastRow
    const getRowInsert = ws.getRow(++lastRow.number)
    getRowInsert.getCell('A').value = 'yo'
    getRowInsert.commit()
  }
}

export default ExcelService
