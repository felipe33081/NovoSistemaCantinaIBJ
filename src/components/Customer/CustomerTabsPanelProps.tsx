import { Paper, Box } from "@mui/material";
import React from "react";
import { CustomTabPanel, CustomTabs } from "../CustomTabPanel";
import FormTextField from "../FormTextField";
import { PhoneMaskInput } from "../PhoneMaskField";
import { ICustomerTabsPanelProps } from "../../utils/interfaces/interfaces";
import { renderBalanceCustomer } from "../../hooks/renderBalanceCustomer";
import Helper from "../../helpers/format.helpers";

export const CustomerTabsPanel = ({
  id,
  tabIndex,
  setTabIndex,
  name,
  phoneNumber,
  balance,
  setName,
  setPhone
}: ICustomerTabsPanelProps) => {
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "8px",
        overflow: "hidden",
        mt: 2,
      }}
    >
      <CustomTabs
        value={tabIndex}
        onChange={handleChangeTab}
        labels={["Informações", "Pedidos"]}
      />

      <CustomTabPanel value={tabIndex} index={0}>
        <Box component="form" display="flex" flexDirection="column" gap={3}>
          <FormTextField
            id="name"
            name="name"
            label="Nome"
            type="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Box component="form" display="flex" gap={3}>
            <PhoneMaskInput
              id="phoneNumber"
              label="Telefone"
              fullWidth
              required
              placeholder="(00) 00000-0000"
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 3 }}
              value={phoneNumber}
            />
            <FormTextField
              id="balance"
              name="balance"
              label="Saldo"
              disabled
              value={Helper.formatCurrencyAsIs(balance)}
            />
          </Box>
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={tabIndex} index={1}>
        {/* Conteúdo da aba Pedidos */}
      </CustomTabPanel>
    </Paper>
  );
};
