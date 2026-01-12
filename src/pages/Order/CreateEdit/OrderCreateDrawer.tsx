import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { postOrderCreate } from '../../../Services/Order/order';
import { useOrderProducts } from '../../../hooks/Order/useOrderProducts';
import { ICreateDrawerProps, IOrderCreateModel } from '../../../utils/interfaces/interfaces';
import { getCustomerList } from '../../../Services/Customer/customer';
import { OrderTabsPanel } from '../../../components/Order/OrderTabsPanel';
import { getProductsColumns } from '../ConteinerList/ProductsList';
import OrderAddProductDrawer from './OrderAddProductDrawer';

export default function OrderCreateDrawer({
    open,
    onClose,
    onSuccess
}: ICreateDrawerProps) {
    const [tabIndex, setTabIndex] = useState(0);
    const [customerType, setCustomerType] = useState<'registered' | 'avulso'>('registered');
    const [customerName, setCustomerName] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
    const [customerOptions, setCustomerOptions] = useState<any[]>([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const { productsData, setProductsData, addProduct, removeProduct } = useOrderProducts([]);
    const [openAddProduct, setOpenAddProduct] = useState(false);

    useEffect(() => {
        if (open) {
            setCustomerType('registered');
            setCustomerName("");
            setSelectedCustomer(null);
            setProductsData([]);
            setTabIndex(0);

            fetchCustomers();
        }
    }, [open]);

    const fetchCustomers = async () => {
        setLoadingCustomers(true);
        try {
            const response = await getCustomerList({ page: 0, size: 500 });
            setCustomerOptions(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCustomers(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (productsData.length === 0) {
            alert("Adicione pelo menos um produto.");
            return;
        }

        const orderPayload: IOrderCreateModel = {
            customerPersonId: customerType === 'registered' ? selectedCustomer?.id : null,
            customerName: customerType === 'avulso' ? customerName : null,

            products: productsData.map(p => ({
                productId: p.productId,
                quantity: Number(p.quantity)
            }))
        };

        try {
            await postOrderCreate(orderPayload);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao criar pedido", error);
        }
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Novo Pedido"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Criar</Button>
                </Box>
            }
        >
            <OrderTabsPanel
                isCreating={true}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                customerType={customerType}
                setCustomerType={setCustomerType}
                customerName={customerName}
                setCustomerName={setCustomerName}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                customerOptions={customerOptions}
                loadingCustomers={loadingCustomers}
                rows={productsData}
                loading={false}
                columns={getProductsColumns(removeProduct)}
                onAddProductDrawer={() => setOpenAddProduct(true)}
            />

            <OrderAddProductDrawer
                open={openAddProduct}
                onClose={() => setOpenAddProduct(false)}
                onAddProduct={addProduct}
            />

        </DrawerWrapper>
    );
}