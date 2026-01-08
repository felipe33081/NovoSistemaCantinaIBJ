import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { IEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { useTabs } from '../../../hooks/useTabs';
import { getProductsColumns } from '../ConteinerList/ProductsList';
import { DrawerContentLoader } from '../../../components/DrawerContentLoader';
import { useSubmitOrderForm } from '../../../hooks/Order/useSubmitOrderForm';
import { deleteOrderById, getOrderById } from '../../../Services/Order/order';
import { OrderTabsPanel } from '../../../components/Order/OrderTabsPanel';
import OrderAddProductDrawer from './OrderAddProductDrawer';

export default function OrderEditDrawer({
    id,
    open,
    onClose,
    onSuccess
}: IEditDrawerProps) {
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerPersonId, setCustomerPersonId] = useState(0);
    const [customerPersonDisplay, setCustomerPersonDisplay] = useState('');
    const [productsData, setProductsData] = useState<any[]>([]);
    const { tabIndex, setTabIndex } = useTabs();
    const [loading, setLoading] = useState(true);
    const [openAddProductDrawer, setOpenAddProductDrawer] = useState(false);
    const { handleSubmit } = useSubmitOrderForm({
        id,
        customerName,
        customerPersonId,
        data: productsData,
        onSuccess,
        onClose,
    });

    const fetchOrders = async () => {
        if (!id) return;
        setLoading(true);

        try {
            const orderRes = await getOrderById(id);

            setCustomerName(orderRes.customerName || '');
            setCustomerPersonId(orderRes.customerPersonId || 0);
            setCustomerPersonDisplay(orderRes.customerPersonDisplay || '');

            const formattedProducts = (orderRes.products || []).map((item: any) => ({
                id: item.productId,
                name: item.description ? `${item.name} - ${item.description}` : item.name,
                quantity: item.quantity || 0,
                price: item.price,
                totalPrice: item.price * (item.quantity || 0)
            }));

            setProductsData(formattedProducts);
            setTotalRows(formattedProducts.length);

            // Se você tiver estados para exibir valores financeiros no Drawer:
            // setTotalValue(orderRes.totalValue);
            // setStatus(orderRes.statusDisplay);

        } catch (error) {
            console.error('Erro ao carregar dados do pedido:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && id) {
            fetchOrders();
        } else if (!open) {
            setCustomerName('');
            setCustomerPersonId(0);
            setProductsData([]);
            setLoading(true);
            setTabIndex(0);
        }
    }, [id, open]);

    const handleAddProductToList = (newItem: any) => {
        const existingItemIndex = productsData.findIndex(p => p.productId === newItem.productId);

        if (existingItemIndex >= 0) {
            const updatedList = [...productsData];
            const currentQty = updatedList[existingItemIndex].quantity;
            const addedQty = newItem.quantity;

            updatedList[existingItemIndex].quantity = currentQty + addedQty;
            setProductsData(updatedList);
        } else {
            setProductsData([...productsData, newItem]);
        }
    };

    const handleRemoveProductFromList = (productId: number) => {
        const updatedProducts = productsData.filter(item => item.id !== productId);
        setProductsData(updatedProducts);
    };

    const handleRefresh = () => {
        fetchOrders();
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Editar pedido"
            actions={
                !loading && (
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                    </Box>
                )
            }
        >
            <OrderAddProductDrawer
                open={openAddProductDrawer}
                onClose={() => setOpenAddProductDrawer(false)}
                onAddProduct={handleAddProductToList}
            />

            <DrawerContentLoader loading={loading}>
                <OrderTabsPanel
                    id={id}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                    customerName={customerName}
                    customerPersonId={customerPersonId}
                    customerPersonDisplay={customerPersonDisplay}
                    rows={productsData}
                    loading={loading}
                    columns={getProductsColumns(handleRemoveProductFromList)}
                    onAddProductDrawer={() => {
                        setOpenAddProductDrawer(true);
                        console.log("Abrir seleção de produtos");
                    }}
                />
            </DrawerContentLoader>
        </DrawerWrapper>
    )
}