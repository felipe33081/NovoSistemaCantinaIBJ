import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Helper from "../../../helpers/format.helpers";
import { renderDate } from "../../../hooks/renderDate";
import { renderBalanceCustomer } from "../../../hooks/renderBalanceCustomer";

export const customerColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Nome',
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.name
    },
    {
        field: 'phone',
        headerName: 'Telefone',
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => Helper.formatPhoneNumber(cellValues.row?.phone)
    },
    {
        filterable: false,
        field: 'balance',
        headerName: 'Saldo',
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => renderBalanceCustomer(cellValues.value as any)
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
        filterable: false,
        field: "updatedAt",
        headerName: "Atualizado em",
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => renderDate(cellValues.row?.updatedAt) ?? "N/a"
    },
    {
        filterable: false,
        field: 'updatedBy',
        headerName: 'Atualizado por',
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.updatedBy ?? "N/a"
    }
];