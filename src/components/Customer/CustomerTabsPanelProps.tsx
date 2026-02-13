import { Paper, Box } from "@mui/material";
import React from "react";
import { CustomTabPanel, CustomTabs } from "../CustomTabPanel";
import FormTextField from "../FormTextField";
import { PhoneMaskInput } from "../PhoneMaskField";
import { ICustomerTabsPanelProps } from "../../utils/interfaces/interfaces";
import { CustomerOrderHistory } from "./CustomerOrderHistory";
import CurrencyInput from "../CurrencyInput";

export const CustomerTabsPanel = ({
    tabIndex,
    setTabIndex,
    name,
    phoneNumber,
    balance,
    orders,
    setName,
    setPhone,
    setBalance
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
                        {/* <PhoneMaskInput
                            id="phoneNumber"
                            label="Telefone"
                            fullWidth
                            required
                            placeholder="(00) 00000-0000"
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ mb: 3 }}
                            value={phoneNumber}
                        /> */}
                        <CurrencyInput
                            name="balance"
                            label="Saldo"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                        />
                    </Box>
                </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tabIndex} index={1}>
                <CustomerOrderHistory orders={orders} />
            </CustomTabPanel>
        </Paper>
    );
};
