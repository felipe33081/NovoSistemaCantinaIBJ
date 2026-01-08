import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ICustomDataGridType } from '../utils/interfaces/interfaces';
import { CustomNoRowsOverlay } from '../internals/components/CustomIcons';

export const DataTableShort = ({
  rows,
  columns,
  totalRows,
  loading,
  customRowId
}: ICustomDataGridType) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={totalRows}
      loading={loading}
      slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      getRowId={(row) => {
        if (customRowId && row[customRowId] != null) {
          return row[customRowId];
        }
        return row.id;
      }}
      disableColumnResize
      density="compact"
      disableRowSelectionOnClick
      disableColumnMenu
      hideFooter={true}
    />
  )
}