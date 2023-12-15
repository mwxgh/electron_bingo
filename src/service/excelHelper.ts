import * as XLSX from 'xlsx'
import moment from 'moment'

export const exportToExcel = (
  data: unknown[],
  fileNamePrefix = 'NOSAH_SAFETY',
) => {
  const timestamp = moment().format('DD-MM-YYYY')

  const fileName = `${fileNamePrefix}_${timestamp}.xlsx`

  const ws = XLSX.utils.json_to_sheet(data)

  // customize excel file
  const wscols = [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }]
  ws['!cols'] = wscols
  const merge = [
    { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } },
    { s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
  ]
  ws['!merges'] = merge

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  XLSX.writeFile(wb, fileName)
}
