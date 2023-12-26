/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx'
import moment from 'moment'
import { COMPANY } from '@/constants/common'
import { User } from '@/types/common/database'

export const exportToExcel = (data: User[]) => {
  const fileName = `${COMPANY}_${moment().format('DD_MM_YYYY')}.xlsx`

  if (data.length === 0) {
    throw Error('Không có dữ liệu để xuất file !')
  }

  const fieldToExportData = ['index', 'code', 'name', 'factory', 'position']
  const fieldMapping: { [key: string]: string } = {
    index: 'STT',
    code: 'Mã nhân viên',
    name: 'Tên nhân viên',
    factory: 'Xưởng',
    position: 'Công việc',
  }

  const convertedData = data.map((item) => {
    return Object.fromEntries(
      Object.entries(item)
        .filter(([key]) => fieldToExportData.includes(key))
        .map(([oldKey, value]) => [fieldMapping[oldKey] || oldKey, value]),
    )
  })

  const ws = XLSX.utils.json_to_sheet(convertedData)

  const wscols = [
    { wch: 5 },
    { wch: 12 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 2000 },
  ]
  ws['!cols'] = wscols

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  XLSX.writeFile(wb, fileName)
}
