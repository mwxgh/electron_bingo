/* eslint-disable @typescript-eslint/no-unused-vars */
import * as XLSX from 'xlsx'
import moment from 'moment'
import { COMPANY } from '@/constants/common'
import { getUsers } from './users'

interface DataToExport {
  index: number
  code: string
  name: string
  factory: string
  position: string
  round1: number[]
  round2: number[]
  round3: number[]
  round4: number[]
  round5: number[]
  round6: number[]
  round7: number[]
  round8: number[]
  round9: number[]
}
const fileName = `${COMPANY}_${moment().format('DD_MM_YYYY')}.xlsx`

const prepareDataForExportExcel = async (): Promise<{
  hear: DataToExport[]
  sight: DataToExport[]
}> => {
  const data = await getUsers()

  const indexedData = data.map((element, index) => {
    const { uuid, ...rest } = element // Destructure to remove uuid
    return { index: index + 1, ...rest } // Add index property starting from 1
  })

  const modifiedDataSight = indexedData.map((item) => {
    const testingProcess = item.testingProcess || []

    if (testingProcess.length > 0) {
      const newTestingProcess = testingProcess.map((test) => ({
        testUuid: test.testUuid,
        round: test.round,
        answers: test.answers.filter((answer) => answer.type === 'sight'),
      }))

      return {
        index: item.index,
        code: item.code,
        name: item.name,
        factory: item.factory,
        position: item.position,
        testingProcess: newTestingProcess,
      }
    } else {
      return {
        index: item.index,
        code: item.code,
        name: item.name,
        factory: item.factory,
        position: item.position,
        testingProcess: [],
      }
    }
  })

  const modifiedDataHear = indexedData.map((item) => {
    const testingProcess = item.testingProcess || []

    if (testingProcess.length > 0) {
      const newTestingProcess = testingProcess.map((test) => ({
        testUuid: test.testUuid,
        round: test.round,
        answers: test.answers.filter((answer) => answer.type === 'hear'),
      }))

      return {
        index: item.index,
        code: item.code,
        name: item.name,
        factory: item.factory,
        position: item.position,
        testingProcess: newTestingProcess,
      }
    } else {
      return {
        index: item.index,
        code: item.code,
        name: item.name,
        factory: item.factory,
        position: item.position,
        testingProcess: [],
      }
    }
  })

  const convertedHearData: DataToExport[] = modifiedDataHear.map((item) => {
    const convertedItem: DataToExport = {
      index: item.index,
      code: item.code,
      name: item.name,
      factory: item.factory,
      position: item.position,
      round1: [],
      round2: [],
      round3: [],
      round4: [],
      round5: [],
      round6: [],
      round7: [],
      round8: [],
      round9: [],
    }

    item.testingProcess.forEach((test) => {
      const roundKey = `round${test.round}`
      convertedItem[roundKey] = test.answers.map((answer) => answer.time)
    })

    return convertedItem
  })

  const convertedSightData: DataToExport[] = modifiedDataSight.map((item) => {
    const convertedItem: DataToExport = {
      index: item.index,
      code: item.code,
      name: item.name,
      factory: item.factory,
      position: item.position,
      round1: [],
      round2: [],
      round3: [],
      round4: [],
      round5: [],
      round6: [],
      round7: [],
      round8: [],
      round9: [],
    }

    item.testingProcess.forEach((test) => {
      const roundKey = `round${test.round}`
      convertedItem[roundKey] = test.answers.map((answer) => answer.time)
    })

    return convertedItem
  })

  return {
    sight: convertedSightData,
    hear: convertedHearData,
  }
}

function jsonToSheet(jsonData: DataToExport[]) {
  // Calculate the maximum lengths of data, data2, and data3 arrays
  const maxArrayRound1Length = Math.max(
    ...jsonData.map((entry) => (entry.round1 ? entry.round1.length : 0)),
  )
  const maxArrayRound2Length = Math.max(
    ...jsonData.map((entry) => (entry.round2 ? entry.round2.length : 0)),
  )
  const maxArrayRound3Length = Math.max(
    ...jsonData.map((entry) => (entry.round3 ? entry.round3.length : 0)),
  )
  const maxArrayRound4Length = Math.max(
    ...jsonData.map((entry) => (entry.round4 ? entry.round4.length : 0)),
  )
  const maxArrayRound5Length = Math.max(
    ...jsonData.map((entry) => (entry.round5 ? entry.round5.length : 0)),
  )
  const maxArrayRound6Length = Math.max(
    ...jsonData.map((entry) => (entry.round6 ? entry.round6.length : 0)),
  )
  const maxArrayRound7Length = Math.max(
    ...jsonData.map((entry) => (entry.round7 ? entry.round7.length : 0)),
  )
  const maxArrayRound8Length = Math.max(
    ...jsonData.map((entry) => (entry.round8 ? entry.round8.length : 0)),
  )
  const maxArrayRound9Length = Math.max(
    ...jsonData.map((entry) => (entry.round9 ? entry.round9.length : 0)),
  )

  // Create a worksheet
  const ws = XLSX.utils.aoa_to_sheet([
    [
      'STT',
      'Mã nhân viên',
      'Tên nhân viên',
      'Xưởng',
      'Công việc',
      'Lần 1',
      ...Array(maxArrayRound1Length > 1 ? maxArrayRound1Length - 1 : 0).fill(
        '',
      ),
      'Lần 2',
      ...Array(maxArrayRound2Length > 1 ? maxArrayRound2Length - 1 : 0).fill(
        '',
      ),
      'Lần 3',
      ...Array(maxArrayRound3Length > 1 ? maxArrayRound3Length - 1 : 0).fill(
        '',
      ),
      'Lần 4',
      ...Array(maxArrayRound4Length > 1 ? maxArrayRound4Length - 1 : 0).fill(
        '',
      ),
      'Lần 5',
      ...Array(maxArrayRound5Length > 1 ? maxArrayRound5Length - 1 : 0).fill(
        '',
      ),
      'Lần 6',
      ...Array(maxArrayRound6Length > 1 ? maxArrayRound6Length - 1 : 0).fill(
        '',
      ),
      'Lần 7',
      ...Array(maxArrayRound7Length > 1 ? maxArrayRound7Length - 1 : 0).fill(
        '',
      ),
      'Lần 8',
      ...Array(maxArrayRound8Length > 1 ? maxArrayRound8Length - 1 : 0).fill(
        '',
      ),
      'Lần 9',
      ...Array(maxArrayRound9Length > 1 ? maxArrayRound9Length - 1 : 0).fill(
        '',
      ),
    ],
  ])

  // Populate the worksheet with data
  jsonData.forEach((entry) => {
    const {
      index,
      code,
      name,
      factory,
      position,
      round1,
      round2,
      round3,
      round4,
      round5,
      round6,
      round7,
      round8,
      round9,
    } = entry
    const row = [
      index,
      code,
      name,
      factory,
      position,
      ...(round1 || Array(maxArrayRound1Length).fill('')),
      ...Array(maxArrayRound1Length - round1.length).fill(''),
      ...(round2 || Array(maxArrayRound2Length).fill('')),
      ...Array(maxArrayRound2Length - round2.length).fill(''),
      ...(round3 || Array(maxArrayRound3Length).fill('')),
      ...Array(maxArrayRound3Length - round3.length).fill(''),
      ...(round4 || Array(maxArrayRound4Length).fill('')),
      ...Array(maxArrayRound4Length - round4.length).fill(''),
      ...(round5 || Array(maxArrayRound5Length).fill('')),
      ...Array(maxArrayRound5Length - round5.length).fill(''),
      ...(round6 || Array(maxArrayRound6Length).fill('')),
      ...Array(maxArrayRound6Length - round6.length).fill(''),
      ...(round7 || Array(maxArrayRound7Length).fill('')),
      ...Array(maxArrayRound7Length - round7.length).fill(''),
      ...(round8 || Array(maxArrayRound8Length).fill('')),
      ...Array(maxArrayRound8Length - round8.length).fill(''),
      ...(round9 || Array(maxArrayRound9Length).fill('')),
      ...Array(maxArrayRound9Length - round9.length).fill(''),
    ]
    XLSX.utils.sheet_add_aoa(ws, [row], { origin: -1 })
  })
  ws['!cols'] = [{ wch: 4 }, { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 25 }]
  ws['!rows'] = [{ hpx: 30 }]
  return ws
}

const jsonToWorkbook = (
  jsonDataHear: DataToExport[],
  jsonDataSight: DataToExport[],
) => {
  const wsHear = jsonToSheet(jsonDataHear)
  const wsSight = jsonToSheet(jsonDataSight)

  // Create a workbook
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, wsHear, 'Thính vận động')
  XLSX.utils.book_append_sheet(wb, wsSight, 'Thị vận động')

  return wb
}

export const exportToExcel = async () => {
  const { hear, sight } = await prepareDataForExportExcel()

  const dataWorkbook = jsonToWorkbook(hear, sight)

  XLSX.writeFile(dataWorkbook, fileName)
}
