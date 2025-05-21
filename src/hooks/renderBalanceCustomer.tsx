import { Chip } from "@mui/material";
import Helper from "../helpers/format.helpers";
import React from "react";

const makeStyle = (balance: number) => {
    if (balance === 0) {
        return {
            backgroundColor: "#f2f2f6",
            textColor: "#556686",
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

export const renderBalanceCustomer = (balance: number) => {
    const styles = makeStyle(balance);

    return (
        <Chip
            label={Helper.formatCurrencyAsIs(balance)}
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