import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { renderDate } from "../../../hooks/renderDate";
import { renderStatusOrder } from "../../../hooks/renderStatusOrder";
import { renderCurrencyValue } from "../../../hooks/renderCurrencyValue";

export const orderColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Número do Pedido',
        flex: 0.7,
        minWidth: 150,
        renderCell: (cellValues: GridRenderCellParams) => {
            return (
                <div
                    style={{
                        textAlign: 'left',
                        marginLeft: '-8px'
                    }}
                >
                    {cellValues.row?.id}
                </div >
            );
        }
    },
    {
        filterable: false,
        field: 'customerPersonDisplay',
        headerName: 'Nome do Cliente',
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
                    {cellValues.row?.customerPersonDisplay || cellValues.row?.customerName}
                </div >
            );
        }
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
    }
];