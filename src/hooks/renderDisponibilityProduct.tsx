import { Chip } from "@mui/material";
import React from "react";

const makeStyle = (disponibility: boolean) => {
    if (disponibility == true) {
        return {
            backgroundColor: "#f6fef6",
            textColor: "green"
        };
    } else {
        return {
            backgroundColor: "#fff0f0",
            textColor: "red",
        };
    }
};

export const renderDisponibilityProduct = (disponibility: boolean) => {
    const styles = makeStyle(disponibility);

    return (
        <Chip
            label={disponibility ? "Produto Disponível" : "Produto Indisponível"}
            sx={{
                backgroundColor: styles.backgroundColor,
                color: styles.textColor,
                fontWeight: "bold",
                "& .MuiChip-label": {
                    color: styles.textColor,
                },
            }}
            variant="outlined"
        />
    );
};