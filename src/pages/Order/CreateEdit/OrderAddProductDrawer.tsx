import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Autocomplete, Box, Button, CircularProgress } from '@mui/material';
import { IOrderAddProductDrawerProps } from '../../../utils/interfaces/interfaces';
import { getProductList } from '../../../Services/Product/product';
import FormTextField from '../../../components/FormTextField';

export default function OrderAddProductDrawer({
    open,
    onClose,
    onAddProduct
}: IOrderAddProductDrawerProps) {
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [productOptions, setProductOptions] = useState<any[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);

    useEffect(() => {
        if (open) {
            fetchProducts();
            setSelectedProduct(null);
            setQuantity(1);
        }
    }, [open]);

    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const response = await getProductList({ page: 0, size: 200 });
            setProductOptions(response.data || []);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedProduct || quantity <= 0) return;

        const newItem = {
            id: selectedProduct.id,
            productId: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: quantity,
            totalPrice: selectedProduct.price * quantity
        };

        onAddProduct(newItem);

        onClose();
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Novo produto"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Adicionar</Button>
                </Box>
            }
            isWrapperChildren={true}
        >
            <Box component="form" display="flex" flexDirection="column" mt={2} gap={3}>
                <Autocomplete
                    id="product-select"
                    options={productOptions}
                    getOptionLabel={(option) => option.name || ""}
                    value={selectedProduct}
                    onChange={(event: any, newValue: any) => {
                        setSelectedProduct(newValue);
                    }}
                    loading={loadingProducts}
                    renderInput={(params) => (
                        <FormTextField
                            {...params}
                            label="Selecione o Produto"
                            placeholder="Digite para buscar..."
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loadingProducts ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />

                <FormTextField
                    id="quantity"
                    label="Quantidade"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    fullWidth
                    InputProps={{ inputProps: { min: 1 } }}
                />
            </Box>
        </DrawerWrapper>
    )
}