import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import { IEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { useTabs } from '../../../hooks/useTabs';
import { getProductsColumns } from '../ConteinerList/ProductsList';
import { DrawerContentLoader } from '../../../components/DrawerContentLoader';
import { useSubmitOrderForm } from '../../../hooks/Order/useSubmitOrderForm';
import { getOrderById } from '../../../Services/Order/order';
import { OrderTabsPanel } from '../../../components/Order/OrderTabsPanel';
import OrderAddProductDrawer from './OrderAddProductDrawer';
import { useOrderProducts } from '../../../hooks/Order/useOrderProducts';
import { OrderStatusEnum } from '../../../utils/enums/enums';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OrderFinishDialog from '../../../components/Order/OrderFinishDialog';

export default function OrderEditDrawer({
    id,
    open,
    onClose,
    onSuccess
}: IEditDrawerProps) {
    const [customerName, setCustomerName] = useState('');
    const [customerPersonId, setCustomerPersonId] = useState(0);
    const [customerPersonDisplay, setCustomerPersonDisplay] = useState('');
    const [loading, setLoading] = useState(true);
    const { tabIndex, setTabIndex } = useTabs();
    const [openAddProductDrawer, setOpenAddProductDrawer] = useState(false);
    const [orderStatus, setOrderStatus] = useState<number>(0);
    const [orderTotalValue, setOrderTotalValue] = useState<number>(0);
    const [openFinishDialog, setOpenFinishDialog] = useState(false);
    const { productsData, setProductsData, addProduct, removeProduct } = useOrderProducts([]);
    const { handleSubmit } = useSubmitOrderForm({
        id,
        customerName,
        customerPersonId: customerPersonId,
        data: productsData,
        onSuccess,
        onClose,
    });

    const fetchOrders = async () => {
        if (!id) return;
        setLoading(true);

        try {
            const orderRes = await getOrderById(id);

            setCustomerName(orderRes?.customerName || '');
            setCustomerPersonId(orderRes?.customerPersonId || 0);
            setCustomerPersonDisplay(orderRes?.customerPersonDisplay || '');
            setOrderStatus(orderRes?.status || 0);
            setOrderTotalValue(orderRes?.totalValue || 0);

            const formattedProducts = (orderRes?.products || []).map((item: any) => ({
                productId: item.productId,
                id: item.productId,
                name: item.description ? `${item.name} - ${item.description}` : item.name,
                quantity: item.quantity || 0,
                price: item.price,
                totalPrice: item.price * (item.quantity || 0)
            }));

            setProductsData(formattedProducts);

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
            setCustomerPersonDisplay('');
            setOrderStatus(0);
            setOrderTotalValue(0);
            setProductsData([]);
            setLoading(true);
            setTabIndex(0);
        }
    }, [id, open]);

    const handleFinishSuccess = () => {
        onSuccess(); // Atualiza a grid principal
        // Opção A: Fecha o drawer
        onClose(); 

        // Opção B: Recarrega os dados do drawer para mostrar que finalizou (se preferir manter aberto)
        //fetchOrders();
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title={`Editar Pedido #${id}`}
            actions={
                !loading && (
                    <Box display="flex" justifyContent="space-between" width="100%">
                        {/* LADO ESQUERDO: Botão de Finalizar */}
                        <Box>
                            {orderStatus === OrderStatusEnum.InProgress && (
                                <Button
                                    variant="contained"
                                    color="success" // Cor verde para destaque
                                    onClick={() => setOpenFinishDialog(true)}
                                    startIcon={<CheckCircleOutlineIcon />}
                                >
                                    Finalizar
                                </Button>
                            )}
                        </Box>

                        {/* LADO DIREITO: Ações normais */}
                        <Box display="flex" gap={2}>
                            <Button onClick={onClose}>Cancelar</Button>
                            <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                        </Box>
                    </Box>
                )
            }
        >
            <OrderAddProductDrawer
                open={openAddProductDrawer}
                onClose={() => setOpenAddProductDrawer(false)}
                onAddProduct={addProduct}
            />

            <OrderFinishDialog
                open={openFinishDialog}
                onClose={() => setOpenFinishDialog(false)}
                onSuccess={handleFinishSuccess}
                orderId={id || 0}
                totalValue={orderTotalValue}
            />

            <DrawerContentLoader loading={loading}>
                <OrderTabsPanel
                    id={id}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                    isCreating={false}
                    customerName={customerPersonDisplay || customerName}
                    setCustomerName={setCustomerName}
                    rows={productsData}
                    loading={loading}
                    columns={getProductsColumns(removeProduct)}
                    onAddProductDrawer={() => {
                        setOpenAddProductDrawer(true);
                    }}
                />
            </DrawerContentLoader>
        </DrawerWrapper>
    );
}