import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CustomNoRowsOverlay } from '../internals/components/CustomIcons';
import CustomToolbar from './CustomToolBar';
import { ICustomDataGridType } from '../utils/interfaces/interfaces';

export const DataTable = <T,>({
  rows,
  columns,
  totalRows,
  currentPage = 0,
  rowsPerPage = 10,
  loading,
  setCurrentPage,
  setRowsPerPage,
  onFilterChange,
  onSortChange,
  onEdit
}: ICustomDataGridType<T>) => {
  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      rowCount={totalRows}
      pageSizeOptions={[5, 10, 20, 35, { value: -1, label: 'All' }]}
      paginationMode="server"
      paginationModel={{
        page: currentPage,
        pageSize: rowsPerPage,
      }}
      onPaginationModelChange={(newModel) => {
        setCurrentPage?.(newModel.page);
        setRowsPerPage?.(newModel.pageSize);
      }}
      loading={loading}
      getRowId={(row) => row.id}
      disableColumnResize
      density="compact"
      disableRowSelectionOnClick
      slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: CustomToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
        pagination: {
          labelRowsPerPage: "Linhas por página:"
        }
      }}
      onRowClick={(params) => {
        if (onEdit) {
          onEdit(params.id as T);
        }
      }}
      filterMode="server"
      onFilterModelChange={onFilterChange}
      sortingMode="server"
      sortingOrder={['asc', 'desc']}
      onSortModelChange={onSortChange}
    />
  );
}