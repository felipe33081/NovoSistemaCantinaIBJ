import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Helper from '../../../helpers/format.helpers';
import { renderUserStatus } from '../../../hooks/renderUserStatus';

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
                    {Helper.formatPhoneNumber(cellValues.row?.phoneNumber)}
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
        renderCell: (cellValues) => renderUserStatus(cellValues.value as any)
    }
];