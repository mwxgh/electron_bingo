import { columns } from '@/constants/common';
import { TableDataType } from '@/types/common/table';

import { Table as AntdTable } from 'antd';

interface Props {
  data: TableDataType[];
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<React.Key[]>>;
  className?: string;
}

const Table: React.FC<Props> = ({
  data,
  selectedRowKeys,
  setSelectedRowKeys,
  className,
  ...rest
}) => {
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys?.(newSelectedRowKeys);
  };

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
  );
};

export default Table;
