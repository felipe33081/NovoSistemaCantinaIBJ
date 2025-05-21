import { Chip } from "@mui/material";
import React from "react";

const makeStyle = (statusDisplay: string) => {
    if (statusDisplay === "Finalizado") {
        return {
            backgroundColor: "#f6fef6",
            textColor: "green",
        };
    } else if (statusDisplay === "Excluído") {
        return {
            backgroundColor: "#fff0f0",
            textColor: "red",
        };
    } else if (statusDisplay === "Em andamento") {
        return {
            backgroundColor: "#59bfff",
            textColor: "white",
        };
    }
    else {
        return {
            backgroundColor: "black",
            textColor: "gray",
          };
    }
};

export const renderStatusOrder = (status: string) => {
    const styles = makeStyle(status);

    return (
        <Chip
            label={status}
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
