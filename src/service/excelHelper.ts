import * as XLSX from 'xlsx'
import moment from 'moment'

export const exportToExcel = (
  data: unknown[],
  fileNamePrefix = 'NOSAH_SAFETY',
) => {
  const timestamp = moment().format('DD-MM-YYYY')

  const fileName = `${fileNamePrefix}_${timestamp}.xlsx`

  const ws = XLSX.utils.json_to_sheet(data)

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  XLSX.writeFile(wb, fileName)
}
