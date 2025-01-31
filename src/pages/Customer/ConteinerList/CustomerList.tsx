import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Helper from "../../../helpers/format.helpers";
import { renderBalance } from "../../../hooks/renderBalance";
import { renderDate } from "../../../hooks/renderDate";

export const customerColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Nome',
        flex: 1,
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
        field: 'phone',
        headerName: 'Telefone',
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => {
            return (
                <div
                    style={{
                        textAlign: 'left',
                        marginLeft: '-8px'
                    }}
                >
                    {Helper.formatPhoneNumber(cellValues.row?.phone)}
                </div >
            );
        }
    },
    {
        filterable: false,
        field: 'balance',
        headerName: 'Saldo',
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => renderBalance(cellValues.value as any)
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
        renderCell: (cellValues: GridRenderCellParams) => (
            <div
                style={{
                    textAlign: 'left',
                    marginLeft: '-8px'
                }}
            >
                {cellValues.row?.createdBy}
            </div>
        )
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
        renderCell: (cellValues: GridRenderCellParams) => (
            <div
                style={{
                    textAlign: 'left',
                    marginLeft: '-8px'
                }}
            >
                {cellValues.row?.updatedBy ?? "N/a"}
            </div>
        )
    }
];