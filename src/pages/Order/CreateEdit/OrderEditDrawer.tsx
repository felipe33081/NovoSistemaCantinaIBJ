import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button, Chip } from '@mui/material';
import { IEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { useTabs } from '../../../hooks/useTabs';
import { getProductsColumns } from '../ConteinerList/ProductsList';
import { DrawerContentLoader } from '../../../components/DrawerContentLoader';
import { useSubmitOrderForm } from '../../../hooks/Order/useSubmitOrderForm';
import { getOrderById, postOrderPrinted } from '../../../Services/Order/order';
import { OrderTabsPanel } from '../../../components/Order/OrderTabsPanel';
import OrderAddProductDrawer from './OrderAddProductDrawer';
import { useOrderProducts } from '../../../hooks/Order/useOrderProducts';
import { OrderStatusEnum } from '../../../utils/enums/enums';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OrderFinishDialog from '../../../components/Order/OrderFinishDialog';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrintIcon from '@mui/icons-material/Print';
import { brand, gray } from '../../../theme/themePrimitives';

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
    const [paymentMethod, setPaymentMethod] = useState('');
    const { productsData, setProductsData, addProduct, removeProduct } = useOrderProducts([]);
    const { handleSubmit } = useSubmitOrderForm({
        id,
        customerName,
        customerPersonId: customerPersonId ?? null,
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
            setPaymentMethod(orderRes?.paymentOfTypeDisplay || 'Não informado'); // <--- NOVO

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
            setPaymentMethod('');
            setProductsData([]);
            setLoading(true);
            setTabIndex(0);
        }
    }, [id, open]);

    const handleFinishSuccess = () => {
        onSuccess(); // Atualiza a grid principal
        // Opção A: Fecha o drawer
        //onClose();

        // Opção B: Recarrega os dados do drawer para mostrar que finalizou (se preferir manter aberto)
        fetchOrders();
    };

    const handleOrderPrinted = async () => {
        try {
            await postOrderPrinted(id);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao imprimir pedido", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title={`Editar Pedido #${id}`}
            actions={
                !loading && (
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <Box>
                            {orderStatus === OrderStatusEnum.InProgress && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => setOpenFinishDialog(true)}
                                    startIcon={<CheckCircleOutlineIcon />}
                                >
                                    Finalizar
                                </Button>
                            )}
                            {orderStatus === OrderStatusEnum.Finished && (
                                <Button
                                    variant="contained"
                                    onClick={() => handleOrderPrinted()}
                                    startIcon={<PrintIcon />}
                                >
                                    Imprimir Pedido
                                </Button>
                            )}
                            {orderStatus === OrderStatusEnum.Finished && paymentMethod && (
                                <Chip
                                    icon={<AttachMoneyIcon />}
                                    label={`Pago via: ${paymentMethod}`}
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ margin: 2, fontWeight: 'bold' }}
                                />
                            )}
                        </Box>
                        {orderStatus === OrderStatusEnum.InProgress && (
                            <Box display="flex" gap={2}>
                                <Button onClick={onClose}>Cancelar</Button>
                                <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                            </Box>
                        )}
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