/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table as AntdTable } from 'antd'

interface Props {
  data: any
  columns: any
  selectedRowKeys?: React.Key[]
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<React.Key[]>>
  className?: string
}

const Table: React.FC<Props> = ({
  data,
  columns,
  selectedRowKeys,
  setSelectedRowKeys,
  className,
  ...rest
}) => {
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys?.(newSelectedRowKeys)
  }

  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
        type: 'checkbox',
      }}
      bordered
      scroll={{
        y: 550,
      }}
      tableLayout="fixed"
      className={className}
      {...rest}
    />
  )
}

export default Table
