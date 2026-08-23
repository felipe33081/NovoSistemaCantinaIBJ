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
import { useToast } from '../../../components/ToastContext';
import { CircularProgress } from '@mui/material'; // Para dar um feedback visual legal

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
    const { showError } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Resetar o isSubmitting quando o drawer fechar/abrir
    useEffect(() => {
        if (open) {
            // ... seus resets existentes
            setIsSubmitting(false);
        }
    }, [open]);

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

        // TRAVA 1: Se já estiver enviando, não deixa entrar de novo
        if (isSubmitting) return;

        if (selectedCustomer === null && customerName.trim() === '') {
            showError("Preencha o nome do cliente ou selecione um cliente cadastrado.");
            return;
        }

        if (productsData.length === 0) {
            showError("Adicione pelo menos um produto ao pedido.");
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

        setIsSubmitting(true); // ATIVA O LOCK AQUI
        try {
            const newOrderId = await postOrderCreate(orderPayload);
            onClose();
            // Passa o id do pedido recem-criado para que a tela ja abra o
            // modal de edicao/finalizacao desse pedido.
            onSuccess(newOrderId);
        } catch (error) {
            console.error("Erro ao criar pedido", error);
            setIsSubmitting(false); // SÓ LIBERA SE DER ERRO, para o usuário tentar de novo
        }
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Novo Pedido"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose} disabled={isSubmitting}>Cancelar</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSubmit}
                        // TRAVA 2: Desabilita visualmente o botão
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {isSubmitting ? "Criando..." : "Criar"}
                    </Button>
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