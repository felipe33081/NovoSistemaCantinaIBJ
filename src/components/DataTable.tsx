import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { CustomNoRowsOverlay } from '../internals/components/CustomIcons';
import CustomToolbar from './CustomToolBar';

export interface ICustomDataGridType {
  rows: never[]
  columns: GridColDef[]
  totalRows: number
  currentPage: number
  rowsPerPage: number
  loading: boolean
  setCurrentPage: (value: number) => void
  setRowsPerPage: (value: number) => void
  onFilterChange: (filterModel: GridFilterModel) => void;
  onSortChange?: (sortModel: GridSortModel) => void
}

export const DataTable = ({
  rows,
  columns,
  totalRows,
  currentPage,
  rowsPerPage,
  loading,
  setCurrentPage,
  setRowsPerPage,
  onFilterChange,
  onSortChange
}: ICustomDataGridType) => {
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
        setCurrentPage(newModel.page);
        setRowsPerPage(newModel.pageSize);
      }}
      loading={loading}
      getRowId={(row) => row.id}
      disableColumnResize
      density="compact"
      //checkboxSelection
      disableRowSelectionOnClick
      slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: CustomToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      filterMode="server"
      onFilterModelChange={onFilterChange}
      sortingMode="server"
      sortingOrder={['asc', 'desc']}
      onSortModelChange={onSortChange}
    />
  );
}