import { Chip } from "@mui/material";
import Helper from "../helpers/format.helpers";
import React from "react";

export const renderCurrencyValue = (balance: number) => {
    return (
        <Chip
            label={Helper.formatCurrencyAsIs(balance)}
            variant="outlined"
        />
    );
};