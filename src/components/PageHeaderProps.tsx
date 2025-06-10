import { Box, Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { PageHeaderProps } from "../utils/interfaces/interfaces";

export const PageHeader = ({
  title,
  onRefresh,
  onCreate,
  showRefresh = true,
  createLabel = "Novo"
}: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1
      }}
    >
      <Typography component="h2" variant="h6">
        {title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {showRefresh && (
          <Button onClick={onRefresh}>
            <RefreshIcon />
            Atualizar
          </Button>
        )}

        {onCreate && (
          <Button variant="contained" onClick={onCreate}>
            <AddIcon />
            {createLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
};