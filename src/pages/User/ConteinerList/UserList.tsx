
import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

export const userColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Nome',
        flex: 1.5,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => {
            return (
                <div
                    style={{
                        textAlign: 'left',
                        marginLeft: '-8px'
                    }}
                >
                    {cellValues.row?.name}
                </div >
            );
        }
    },
    {
        field: 'email',
        headerName: 'E-mail',
        flex: 1.5,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => {
            return (
                <div
                    style={{
                        textAlign: 'left',
                        marginLeft: '-8px'
                    }}
                >
                    {cellValues.row?.email}
                </div >
            );
        }
    },
    {
        filterable: false,
        field: 'phoneNumber',
        headerName: 'Telefone',
        flex: 1.5,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => {
            return (
                <div
                    style={{
                        textAlign: 'left',
                        marginLeft: '-8px'
                    }}
                >
                    {cellValues.row?.phoneNumber}
                </div >
            );
        }
    },
    {
        filterable: false,
        field: 'userStatus',
        headerName: 'Status',
        flex: 1.5,
        minWidth: 200,
        renderCell: (cellValues) => renderStatus(cellValues.value as any)
    }
];

const renderStatus = (status: 'CONFIRMED' | 'FORCE_CHANGE_PASSWORD') => {
    const colors: { [index: string]: 'success' | 'error' } = {
        CONFIRMED: 'success',
        FORCE_CHANGE_PASSWORD: 'error',
    };

    return (
        <Chip
            label={
                status === "CONFIRMED"
                    ? "Confirmado"
                    : status === "FORCE_CHANGE_PASSWORD"
                        ? "Alteração de Senha"
                        : "N/A"
            }
            color={colors[status]}
            size="small"
        />
    );
};