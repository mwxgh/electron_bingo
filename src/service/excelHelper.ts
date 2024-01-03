/* eslint-disable @typescript-eslint/no-unused-vars */
import * as XLSX from 'xlsx'
import moment from 'moment'
import { COMPANY } from '@/constants/common'
import { getUsers } from './users'
import { mean } from 'lodash'
import {
  DataToExport,
  DataUserClassified,
  IndexedDataUser,
  TestType,
  typeLabels,
} from '@/types/common/database'

const fileName = `${COMPANY}_${moment().format('DD_MM_YYYY')}.xlsx`

const getModifiedData = (
  indexedData: IndexedDataUser[],
  targetType: TestType,
) =>
  indexedData.map((item) => ({
    index: item.index,
    code: item.code,
    name: item.name,
    factory: item.factory,
    position: item.position,
    testingProcess:
      item.testingProcess?.map((test) => ({
        testUuid: test.testUuid,
        round: test.round,
        answers: (test.answers || []).filter(({ type }) => type === targetType),
      })) || [],
  }))

const convertDataToExport = (modifiedData: DataUserClassified[]) =>
  modifiedData.map((item) => {
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
      convertedItem[roundKey] = test.answers.map(({ time }) => time)
    })

    return convertedItem
  })

const prepareDataForExportExcel = async (): Promise<{
  hear: DataToExport[]
  sight: DataToExport[]
}> => {
  const data = await getUsers()

  const indexedData = data.map((element, index) => {
    const { uuid, ...rest } = element
    return { index: index + 1, ...rest }
  })

  return {
    sight: convertDataToExport(getModifiedData(indexedData, TestType.sight)),
    hear: convertDataToExport(getModifiedData(indexedData, TestType.hear)),
  }
}

const jsonToSheet = (jsonData: DataToExport[]) => {
  const roundArrayNames = Array.from({ length: 9 }, (_, i) => `round${i + 1}`)

  const maxArrayLengths = roundArrayNames.map((round) =>
    Math.max(
      ...jsonData.map((entry) => (entry[round] ? entry[round].length : 0)),
    ),
  )

  // Create a worksheet
  const headerRow = [
    'STT',
    'Mã nhân viên',
    'Tên nhân viên',
    'Xưởng',
    'Công việc',
  ]

  for (let i = 1; i <= 9; i++) {
    const tbLabel = `TB${i}`
    const maxArrayLength = maxArrayLengths[i - 1]
    headerRow.push(`Lần ${i}`)
    headerRow.push(
      ...Array(maxArrayLength > 1 ? maxArrayLength - 1 : 0).fill(''),
    )
    headerRow.push(tbLabel)
  }

  const ws = XLSX.utils.aoa_to_sheet([headerRow])

  // Populate the worksheet with data
  jsonData.forEach((entry) => {
    const { index, code, name, factory, position, ...rounds } = entry
    const row = [
      index,
      code,
      name,
      factory,
      position,
      ...roundArrayNames.flatMap((round, i) => [
        ...(rounds[round] || Array(maxArrayLengths[i]).fill('')),
        ...Array(
          maxArrayLengths[i] > 1
            ? maxArrayLengths[i] - (rounds[round] ? rounds[round].length : 0)
            : 1,
        ).fill(''),
        rounds[round] && rounds[round].length > 0
          ? Math.round(mean(rounds[round]))
          : 0,
      ]),
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
): XLSX.WorkBook => {
  const wsHear = jsonToSheet(jsonDataHear)
  const wsSight = jsonToSheet(jsonDataSight)

  // Create a workbook
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, wsHear, typeLabels.hear)
  XLSX.utils.book_append_sheet(wb, wsSight, typeLabels.sight)

  return wb
}

export const exportToExcel = async (): Promise<void> => {
  const { hear, sight } = await prepareDataForExportExcel()

  const dataWorkbook: XLSX.WorkBook = jsonToWorkbook(hear, sight)

  XLSX.writeFile(dataWorkbook, fileName)
}
