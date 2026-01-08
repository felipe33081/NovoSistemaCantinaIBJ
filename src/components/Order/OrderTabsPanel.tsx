import React from 'react';
import { Box, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CustomTabPanel, CustomTabs } from '../CustomTabPanel';
import FormTextField from '../FormTextField';
import { DataTableShort } from '../DataTableShort';
import { IOrderTabsPanelProps } from '../../utils/interfaces/interfaces';

export const OrderTabsPanel = ({
    id,
    tabIndex,
    setTabIndex,
    customerName,
    customerPersonId,
    customerPersonDisplay,
    rows,
    totalRows = 0,
    loading,
    columns,
    onAddProductDrawer,
}: IOrderTabsPanelProps) => {

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
                labels={["Cliente", "Produtos"]}
            />

            <CustomTabPanel value={tabIndex} index={0}>
                <Box component="form" display="flex" flexDirection="column" gap={3}>
                    <Box display="flex" gap={3}>
                        <FormTextField
                            id="orderId"
                            name="orderId"
                            label="Nº Pedido"
                            value={id || ''}
                            disabled
                            sx={{ width: '150px' }}
                        />

                        {customerPersonId ? (
                            <FormTextField
                                id="customerPerson"
                                label="Nome do cliente"
                                value={customerPersonDisplay || ''}
                                disabled
                                sx={{ flex: 1 }}
                            />
                        ) : (
                            <FormTextField
                                id="customerName"
                                name="customerName"
                                label="Nome do cliente"
                                value={customerName}
                                disabled
                                sx={{ flex: 1 }}
                            />
                        )}
                    </Box>

                </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tabIndex} index={1}>
                <DataTableShort
                    rows={rows}
                    columns={columns}
                    totalRows={totalRows || rows.length}
                    loading={loading}
                    customRowId={"productId"}
                />

                <Button
                    className="save-button"
                    onClick={onAddProductDrawer}
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    <AddIcon />
                    Adicionar Produto
                </Button>
            </CustomTabPanel>
        </Paper>
    );
};