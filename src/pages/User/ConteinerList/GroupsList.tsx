import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const getGroupsColumns = (
    handleDelete: (id: string) => void
): GridColDef[] => {

    const groupNamesPT: Record<string, string> = {
        MasterAdmin: 'Administrador Master',
        Admin: 'Administrador',
        User: 'Usuário'
    };

    return [
        {
            field: 'groupName',
            headerName: 'Nome do Grupo',
            flex: 1.5,
            minWidth: 200,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => {
                const originalValue = params.row?.groupName;
                return groupNamesPT[originalValue] || originalValue;
            }
        },
        {
            field: 'actions',
            headerName: 'Ações',
            sortable: false,
            filterable: false,
            width: 85,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => (
                <Box display="flex">
                    <Button
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(params.row.groupName);
                        }}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                </Box>
            )
        }
    ];
};