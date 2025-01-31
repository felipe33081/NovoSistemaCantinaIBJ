import { Chip } from "@mui/material";
import Helper from "../helpers/format.helpers";
import React from "react";

const makeStyle = (balance: number) => {
    if (balance === 0) {
        return {
            backgroundColor: "#e0e1dd",
            textColor: "#778da9",
        };
    } else if (balance < 0) {
        return {
            backgroundColor: "#fff0f0",
            textColor: "red",
        };
    } else {
        return {
            backgroundColor: "#f6fef6",
            textColor: "green"
        };
    }
};

export const renderBalance = (balance: number) => {
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
                    color: styles.textColor,
                },
            }}
            variant="outlined"
        />
    );
};