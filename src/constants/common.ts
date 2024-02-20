import { TestTableDataType, UserTableDataType } from '@/types/common/table'
import type { ColumnsType } from 'antd/es/table'
import Sound1 from '@/assets/sound/sound1.mp3'
import Sound2 from '@/assets/sound/sound2.mp3'
import Sound3 from '@/assets/sound/sound3.mp3'

export const NUMBER_OF_TEST = 9
export const COMPANY = 'NOSAH_SAFETY'
export const DEFAULT_SETTING = {
  QUESTION_BREAK_TIME: 2000,
  MIN_QUANTITY_QUESTION: 5,
  MAX_QUANTITY_QUESTION: 20,
  SOUND: 1,
}

export const userTableColumns: ColumnsType<UserTableDataType> = [
  {
    title: 'STT',
    dataIndex: 'index',
    width: 60,
  },
  {
    title: 'Mã nhân viên',
    dataIndex: 'code',
    width: 130,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Xưởng',
    dataIndex: 'factory',
    width: 150,
  },
  {
    title: 'Công việc',
    dataIndex: 'position',
    width: 300,
  },
  {
    title: 'Kiểm tra',
    dataIndex: 'completedTest',
    width: 570,
  },
] as const

export const testTableColumns: ColumnsType<TestTableDataType> = [
  {
    title: 'STT',
    dataIndex: 'index',
    width: 60,
  },
  {
    title: 'Tên đề kiểm tra',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: 'Loại đề kiểm tra',
    dataIndex: 'type',
    width: 120,
  },
  {
    title: 'Số lượng câu hỏi',
    dataIndex: 'quantity',
    width: 250,
  },
] as const

export const testSteps = [
  {
    label: 'Ghi danh',
  },
  {
    label: 'Chọn đề',
  },
  {
    label: 'Kiểm tra',
  },
  {
    label: 'Hoàn thành',
  },
] as const

export const colorCodePalette = [
  {
    name: 'red',
    hex: '#FF0000',
  },
  {
    name: 'mediumVioletRed',
    hex: '#C71585',
  },
  {
    name: 'darkOrange',
    hex: '#FF8C00',
  },
  {
    name: 'yellow',
    hex: '#FFFF00',
  },
  {
    name: 'blueViolet',
    hex: '#8A2BE2',
  },
  {
    name: 'darkGreen',
    hex: '#006400',
  },
  {
    name: 'maroon',
    hex: '#800000',
  },
  {
    name: 'navy',
    hex: '#000080',
  },
]

export const keyBoard = [
  {
    key: '1',
    keyCode: 49,
    which: 49,
    code: 'Digit1',
  },
  {
    key: '2',
    keyCode: 50,
    which: 50,
    code: 'Digit2',
  },
  {
    key: '3',
    keyCode: 51,
    which: 51,
    code: 'Digit3',
  },
  {
    key: '4',
    keyCode: 52,
    which: 52,
    code: 'Digit4',
  },
  {
    key: 'Enter',
    keyCode: 13,
    which: 13,
    code: 'Enter',
  },
] as const

export const excelFileHeader = [
  'Mã nhân viên',
  'Tên nhân viên',
  'Xưởng',
  'Công việc',
] as const

export const soundsSource = [Sound1, Sound2, Sound3]
