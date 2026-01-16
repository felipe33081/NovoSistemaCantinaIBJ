import React from 'react';
import { Box, Paper, Button, CircularProgress, Autocomplete, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CustomTabPanel, CustomTabs } from '../CustomTabPanel';
import FormTextField from '../FormTextField';
import { DataTableShort } from '../DataTableShort';
import { IOrderTabsPanelProps } from '../../utils/interfaces/interfaces';

export const OrderTabsPanel = ({
    tabIndex,
    setTabIndex,
    isCreating = false,
    id,
    customerType = 'avulso',
    setCustomerType,
    customerName,
    setCustomerName,
    selectedCustomer,
    setSelectedCustomer,
    customerOptions = [],
    loadingCustomers = false,
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
        <Paper elevation={0} sx={{ borderRadius: "8px", overflow: "hidden", mt: 2 }}>
            <CustomTabs value={tabIndex} onChange={handleChangeTab} labels={["Cliente", "Produtos"]} />

            {/* --- ABA 0: CLIENTE --- */}
            <CustomTabPanel value={tabIndex} index={0}>
                <Box component="form" display="flex" flexDirection="column" gap={3}>

                    {isCreating && setCustomerType && (
                        <RadioGroup
                            row
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value as 'registered' | 'avulso')}
                        >
                            <FormControlLabel value="registered" control={<Radio />} label="Cliente Cadastrado" />
                            <FormControlLabel value="avulso" control={<Radio />} label="Cliente Avulso" />
                        </RadioGroup>
                    )}

                    <Box display="flex" gap={3}>
                        {!isCreating && (
                            <FormTextField
                                id="orderId"
                                label="Nº Pedido"
                                value={id || ''}
                                disabled
                                sx={{ width: '150px' }}
                            />
                        )}

                        {isCreating && customerType === 'registered' ? (
                            <Autocomplete
                                id="customer-autocomplete"
                                options={customerOptions}
                                getOptionLabel={(option) => option.name || ""}
                                value={selectedCustomer}
                                onChange={(event, newValue) => setSelectedCustomer && setSelectedCustomer(newValue)}
                                loading={loadingCustomers}
                                sx={{ flex: 1 }}
                                renderInput={(params) => (
                                    <FormTextField
                                        {...params}
                                        label="Buscar Cliente Cadastrado"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {loadingCustomers ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        ) : (
                            <FormTextField
                                id="customerName"
                                label={isCreating ? "Nome do Cliente (Avulso)" : "Cliente"}
                                value={isCreating ? customerName : (selectedCustomer?.name || customerName)}
                                onChange={(e) => setCustomerName(e.target.value)}
                                disabled={!isCreating}
                                sx={{ flex: 1 }}
                            />
                        )}
                    </Box>
                </Box>
            </CustomTabPanel>

            {/* --- ABA 1: PRODUTOS --- */}
            <CustomTabPanel value={tabIndex} index={1}>
                <DataTableShort
                    rows={rows}
                    columns={columns}
                    totalRows={totalRows || rows.length}
                    loading={loading}
                    customRowId="productId"
                />
                <Button className="save-button" onClick={onAddProductDrawer} variant="contained" sx={{ mt: 2 }}>
                    <AddIcon /> Adicionar Produto
                </Button>
            </CustomTabPanel>
        </Paper>
    );
};