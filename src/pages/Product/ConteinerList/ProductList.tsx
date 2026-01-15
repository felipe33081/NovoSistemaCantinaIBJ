import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { renderDisponibilityProduct } from "../../../hooks/renderDisponibilityProduct";
import { renderCurrencyValue } from "../../../hooks/renderCurrencyValue";
import { Box, Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from "@mui/icons-material/Edit";

export const getProductColumns = (
    handleDelete: (id: number) => void,
    handleEdit: (id: number) => void
): GridColDef[] => {

    return [
        {
            field: 'name',
            headerName: 'Nome',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.name
        },
        {
            field: 'description',
            headerName: 'Descrição',
            flex: 1,
            minWidth: 300,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.description
        },
        {
            filterable: false,
            field: 'price',
            headerName: 'Preço',
            flex: 1,
            minWidth: 100,
            renderCell: (cellValues: GridRenderCellParams) => renderCurrencyValue(cellValues.value as any)
        },
        {
            filterable: false,
            field: 'quantity',
            headerName: 'Quantidade',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.quantity
        },
        {
            filterable: false,
            field: 'disponibility',
            headerName: 'Disponibilidade',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => renderDisponibilityProduct(cellValues.value as any)
        },
        {
            filterable: false,
            field: 'createdBy',
            headerName: 'Criado por',
            flex: 1,
            minWidth: 200,
            renderCell: (cellValues: GridRenderCellParams) => (cellValues.row?.createdBy)
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