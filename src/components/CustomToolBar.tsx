import React from "react";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";

export default function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton slotProps={{ button: { title: "Filtros" } }} />
            <GridToolbarQuickFilter placeholder="Buscar..." sx={{ ml: 'auto' }} />
        </GridToolbarContainer>
    );
}