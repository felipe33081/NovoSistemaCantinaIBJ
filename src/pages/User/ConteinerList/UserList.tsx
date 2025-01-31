
import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Helper from '../../../helpers/format.helpers';

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
        renderCell: (cellValues) => renderStatus(cellValues.value as any)
    }
];

const makeStyle = (userStatus: string) => {
    if (userStatus === "CONFIRMED") {
      return {
        backgroundColor: "#f6fef6",
        textColor: "green",
      };
    } else if (userStatus === "FORCE_CHANGE_PASSWORD") {
      return {
        backgroundColor: "#fff0f0",
        textColor: "red",
      };
    }
    else {
        return {
            backgroundColor: "black",
            textColor: "gray",
          };
    }
  };

const renderStatus = (status: 'CONFIRMED' | 'FORCE_CHANGE_PASSWORD') => {
    const styles = makeStyle(status);

    return (
        <Chip
            label={status === "CONFIRMED" ? "Confirmado" : "Alteração de Senha"}
            sx={{
                backgroundColor: styles.backgroundColor,
                color: styles.textColor,
                fontWeight: "bold",
                border: `1px solid ${styles.textColor}`,
                "& .MuiChip-label": {
                    color: styles.textColor,
                },
            }}
            variant="outlined"
        />
    );
};