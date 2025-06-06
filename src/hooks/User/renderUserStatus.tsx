import { Chip } from "@mui/material";
import React from "react";

const makeStyle = (userStatus: string) => {
    if (userStatus === "CONFIRMED") {
      return {
        backgroundColor: "#f6fef6",
        textColor: "green",
      };
    } else if (userStatus === "FORCE_CHANGE_PASSWORD") {
      return {
        backgroundColor: "#fff0f0",
        textColor: "red",
      };
    }
    else {
        return {
            backgroundColor: "black",
            textColor: "gray",
          };
    }
  };

export const renderUserStatus = (status: string) => {
    const styles = makeStyle(status);

    return (
        <Chip
            label={status === "CONFIRMED" ? "Confirmado" : "Alteração de Senha"}
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