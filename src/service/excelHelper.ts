/* eslint-disable @typescript-eslint/no-unused-vars */
import * as XLSX from 'xlsx-js-style'
import moment from 'moment'
import { COMPANY } from '@/constants/common'
import { getUsers } from './users'
interface FieldMapping {
  [key: string]: string
}
const MAX_TEXT_LENGTH_FOR_WRAP = 50

export const exportToExcel = async () => {
  const data = await getUsers()

  const fileName = `${COMPANY}_${moment().format('DD_MM_YYYY')}.xlsx`

  const fieldMapping: FieldMapping = {
    index: 'STT',
    code: 'Mã nhân viên',
    name: 'Tên nhân viên',
    factory: 'Xưởng',
    position: 'Công việc',
    testingProcess: 'Kết quả kiểm tra',
  }

  const newData = data.map((element, index) => {
    const { uuid, ...rest } = Object.fromEntries(
      Object.entries(element).map(([oldKey, value]) => [
        oldKey === 'index'
          ? fieldMapping[oldKey]
          : fieldMapping[oldKey] || oldKey,
        value,
      ]),
    )
    return { STT: index + 1, ...rest }
  })

  const ws = XLSX.utils.json_to_sheet(newData)

  const headerCellStyle = {
    font: { bold: true, size: 12 },
    alignment: { wrapText: true, horizontal: 'center', vertical: 'center' },
  }

  Object.keys(fieldMapping).forEach((_key, index) => {
    const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 })
    ws[cellAddress].s = headerCellStyle
  })

  ws['!cols'] = [
    { wch: 4 },
    { wch: 10 },
    { wch: 20 },
    { wch: 15 },
    { wch: 25 },
    { wch: 5000 },
  ]

  ws['!rows'] = [{ hpx: 30 }]

  const wrapTextCellStyle = {
    font: { size: 12 },
    alignment: { wrapText: true },
  }

  XLSX.utils.sheet_to_json(ws, { header: 1 }).forEach((_row, rowIndex) => {
    Object.keys(fieldMapping).forEach((_key, columnIndex) => {
      const cellAddress = XLSX.utils.encode_cell({
        c: columnIndex,
        r: rowIndex,
      })
      const cellValue = ws[cellAddress]?.v?.toString() || ''

      if (cellValue.length > MAX_TEXT_LENGTH_FOR_WRAP) {
        ws[cellAddress].s = wrapTextCellStyle
      }
    })
  })

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Thính vận động')

  XLSX.writeFile(wb, fileName)
}
