import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const getGroupsColumns = (
    handleDelete: (id: string) => void
): GridColDef[] => {
    return [
        {
            field: 'groupName',
            headerName: 'Nome do Grupo',
            flex: 1.5,
            minWidth: 200,
            sortable: false,
            filterable: false,
            renderCell: (cellValues: GridRenderCellParams) => cellValues.row?.groupName
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
                        onClick={() => handleDelete(params.row.groupName)}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                </Box>
            )
        }
    ];
};