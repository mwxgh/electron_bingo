import { TestTableDataType, UserTableDataType } from '@/types/common/table'
import type { ColumnsType } from 'antd/es/table'

export const NUMBER_OF_TEST = 9

export const userTableColumns: ColumnsType<UserTableDataType> = [
  {
    title: 'STT',
    dataIndex: 'index',
    width: 60,
  },
  {
    title: 'Mã nhân viên',
    dataIndex: 'code',
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
