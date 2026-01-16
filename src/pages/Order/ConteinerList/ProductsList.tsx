import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Helper from '../../../helpers/format.helpers';

export const getProductsColumns = (
    handleDelete: (id: number) => void
): GridColDef[] => {

    return [
        {
            field: 'name',
            headerName: 'Nome',
            flex: 1.5,
            minWidth: 200,
            sortable: false,
            filterable: false,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.name
        },
        {
            field: 'quantity',
            headerName: 'Quantidade',
            flex: 1.5,
            minWidth: 100,
            sortable: false,
            filterable: false,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.quantity
        },
        {
            field: 'price',
            headerName: 'Preço Unitário',
            flex: 1.5,
            minWidth: 130,
            sortable: false,
            filterable: false,
            renderCell: (cellValues: GridRenderCellParams) => Helper.formatCurrencyAsIs(cellValues.row?.price)
        },
        {
            field: 'totalPrice',
            headerName: 'Valor Total',
            flex: 1.5,
            minWidth: 130,
            sortable: false,
            filterable: false,
            renderCell: (cellValues: GridRenderCellParams) => Helper.formatCurrencyAsIs(cellValues.row?.totalPrice)
        },
        {
            field: 'actions',
            headerName: 'Ações',
            sortable: false,
            filterable: false,
            width: 80,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => (
                <Box display="flex">
                    <Button
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                </Box>
            )
        }
    ];
};