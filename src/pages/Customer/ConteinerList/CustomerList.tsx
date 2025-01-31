import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import Helper from "../../../helpers/format.helpers";

const makeStyle = (balance: number) => {
    if (balance === 0) {
        return {
            backgroundColor: "hsl(210, 10%, 58%)",
            textColor: "white",
        };
    } else if (balance < 0) {
        return {
            backgroundColor: "#ffadad8f",
            textColor: "red",
        };
    } else {
        return {
            backgroundColor: "rgb(145 254 159 / 47%)",
            textColor: "green",
        };
    }
};

const renderBalance = (balance: number) => {
    const styles = makeStyle(balance);

    return (
        <Chip
            label={Helper.formatCurrencyAsIs(balance)}
            sx={{
                backgroundColor: styles.backgroundColor,
                color: styles.textColor,
                fontWeight: "bold",
                border: `1px solid ${styles.textColor}`,
                "& .MuiChip-label": {
                    color: styles.textColor, // Isso garante que o texto fique na cor correta
                },
            }}
        />
    );
};

const renderDate = (date: string | Date) => {
    return date && new Date(date).toLocaleDateString("pt-BR");
};

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
        renderCell: (cellValues) => renderBalance(cellValues.value as any)
    },
    // {
    //     field: 'createdAt',
    //     headerName: 'Criado em',
    //     flex: 1,
    //     minWidth: 200,
    //     renderCell: (cellValues: GridRenderCellParams) => renderDate(cellValues.row?.createdAt),
    //     filterComponent: (props) => (
    //         <DatePicker
    //             {...props}
    //             format="dd/MM/yyyy"
    //             InputLabelProps={{ shrink: true }}
    //             placeholder="dd/mm/aaaa"
    //             variant="inline"
    //             value={props?.columnDef?.tableData?.filterValue || null}
    //             disableFuture={true}
    //             onChange={(e) =>
    //                 props.onFilterChanged(props?.columnDef?.tableData?.id, e)
    //             }
    //             helperText={false}
    //         />
    //     )
    // },
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
    // {
    //     field: 'updatedAt',
    //     headerName: 'Atualizado em',
    //     flex: 1,
    //     minWidth: 200,
    //     renderCell: (cellValues: GridRenderCellParams) => renderDate(cellValues.row?.updatedAt),
    //     filterComponent: (props) => (
    //         <DatePicker
    //             {...props}
    //             format="dd/MM/yyyy"
    //             InputLabelProps={{ shrink: true }}
    //             placeholder="dd/mm/aaaa"
    //             variant="inline"
    //             value={props?.columnDef?.tableData?.filterValue || null}
    //             disableFuture={true}
    //             onChange={(e) =>
    //                 props.onFilterChanged(props?.columnDef?.tableData?.id, e)
    //             }
    //             helperText={false}
    //         />
    //     )
    // },
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