import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Helper from '../../../helpers/format.helpers';
import { renderUserStatus } from '../../../hooks/User/renderUserStatus';
import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from "@mui/icons-material/Edit";

export const getUserColumns = (
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void
): GridColDef[] => {

    return [
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
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                </Box>
            )
        }
    ];
};