import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Helper from "../../../helpers/format.helpers";
import { renderDisponibilityProduct } from "../../../hooks/renderDisponibilityProduct";
import { renderCurrencyValue } from "../../../hooks/renderCurrencyValue";

export const productColumns: GridColDef[] = [
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
        field: 'description',
        headerName: 'Descrição',
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
                    {cellValues.row?.description}
                </div >
            );
        }
    },
    {
        filterable: false,
        field: 'price',
        headerName: 'Preço',
        flex: 1,
        minWidth: 200,
        renderCell: (cellValues: GridRenderCellParams) => renderCurrencyValue(cellValues.value as any)
    },
    {   
        filterable: false,  
        field: 'quantity',
        headerName: 'Quantidade',
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
                    {cellValues.row?.quantity}
                </div >
            );
        }
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