import { TestTableDataType, UserTableDataType } from '@/types/common/table'
import type { ColumnsType } from 'antd/es/table'

export const NUMBER_OF_TEST = 9
export const COMPANY = 'NOSAH_SAFETY'
export const DEFAULT_SETTING = {
  QUESTION_BREAK_TIME: 2000,
  MIN_QUANTITY_QUESTION: 5,
  MAX_QUANTITY_QUESTION: 20,
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
    name: 'crimson',
    hex: '#DC143C',
  },
  {
    name: 'deepPink',
    hex: '#FF1493',
  },
  {
    name: 'orangeRed',
    hex: '#FF4500',
  },
  {
    name: 'gold',
    hex: '#FFD700',
  },
  {
    name: 'darkOrchid',
    hex: '#9932CC',
  },
  {
    name: 'forestGreen',
    hex: '#228B22',
  },
  {
    name: 'steelBlue',
    hex: '#4682B4',
  },
  {
    name: 'sienna',
    hex: '#A0522D',
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
