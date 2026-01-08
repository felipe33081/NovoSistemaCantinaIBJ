import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { renderDate } from "../../../hooks/renderDate";
import { renderStatusOrder } from "../../../hooks/renderStatusOrder";
import { renderCurrencyValue } from "../../../hooks/renderCurrencyValue";
import { Box, Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from "@mui/icons-material/Edit";

export const getOrderColumns = (
    handleDelete: (id: number) => void,
    handleEdit: (id: number) => void
): GridColDef[] => {

    return [
        {
            field: 'id',
            headerName: 'Número do Pedido',
            flex: 0.7,
            minWidth: 150,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.id
        },
        {
            filterable: false,
            field: 'customerPersonDisplay',
            headerName: 'Nome do Cliente',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.customerPersonDisplay || cellValues.row?.customerName
        },
        {
            filterable: false,
            field: 'totalValue',
            headerName: 'Valor total',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => renderCurrencyValue(cellValues.value as any)
        },
        {
            filterable: false,
            field: 'statusDisplay',
            headerName: 'Status',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => renderStatusOrder(cellValues.value as any)
        },
        {
            filterable: false,
            field: 'createdAt',
            headerName: 'Criado em',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => renderDate(cellValues.row?.createdAt) ?? "N/a"
        },
        {
            filterable: false,
            field: 'createdBy',
            headerName: 'Criado por',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.createdBy ?? "N/a"
        },
        {
            field: 'actions',
            headerName: 'Ações',
            sortable: false,
            filterable: false,
            width: 140,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => (
                <Box display="flex">
                    <Button
                        color="primary"
                        onClick={() => handleEdit(params.row.id)}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(params.row.id);
                        }}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                </Box>
            )
        }
    ];
};