import { TableDataType } from '@/types/common/table'
import type { ColumnsType } from 'antd/es/table'

export const NUMBER_OF_TEST = 9

export const columns: ColumnsType<TableDataType> = [
  {
    title: 'STT',
    dataIndex: 'index',
    width: 60,
  },
  {
    title: 'Mã nhân viên',
    dataIndex: 'employeeCode',
    width: 120,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Xưởng',
    dataIndex: 'factory',
    width: 250,
  },
  {
    title: 'Công việc',
    dataIndex: 'position',
    width: 250,
  },
  {
    title: 'Bài test',
    dataIndex: 'completedTest',
    width: 570,
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