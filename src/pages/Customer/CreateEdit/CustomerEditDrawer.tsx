import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import { useTabs } from '../../../hooks/useTabs';
import { useSubmitCustomerForm } from '../../../hooks/Customer/useSubmitCustomerForm';
import { CustomerTabsPanel } from '../../../components/Customer/CustomerTabsPanelProps';
import { CustomerEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { getCustomerById } from '../../../Services/Customer/customer';
import { DrawerContentLoader } from '../../../components/DrawerContentLoader';

export default function CustomerEditDrawer({
    id,
    open,
    onClose,
    onSuccess
}: CustomerEditDrawerProps) {
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [name, setName] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [balance, setBalance] = useState(0);
    const { tabIndex, setTabIndex } = useTabs();
    const [loading, setLoading] = useState(true);
    const { handleSubmit } = useSubmitCustomerForm({
        id,
        name,
        phoneNumber,
        balance,
        onSuccess,
        onClose,
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id || !open) return;

            setLoading(true);
            try {
                const response = await getCustomerById(id);
                setName(response.name || '');
                setPhone(response.phone || '');
                setBalance(response.balance || 0);
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id, open]);

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Editar cliente"
            actions={
                !loading && (
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                    </Box>
                )}
        >
            <DrawerContentLoader loading={loading}>
                <CustomerTabsPanel
                    id={id}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                    name={name}
                    phoneNumber={phoneNumber}
                    balance={balance}
                    setName={setName}
                    setPhone={setPhone}
                    setBalance={setBalance}
                    rows={rows}
                    totalRows={totalRows}
                    loading={loading}
                />
            </DrawerContentLoader>
        </DrawerWrapper>
    )
}