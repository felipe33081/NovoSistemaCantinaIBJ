import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import { IEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { DrawerContentLoader } from '../../../components/DrawerContentLoader';
import { getProductById } from '../../../Services/Product/product';
import { useSubmitProductForm } from '../../../hooks/Product/useSubmitProductForm';
import { ProductForm } from '../../../components/Product/ProductForm';

export default function ProductEditDrawer({
    id,
    open,
    onClose,
    onSuccess
}: IEditDrawerProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const { handleSubmit } = useSubmitProductForm({
        id,
        name,
        description,
        price,
        quantity,
        onSuccess,
        onClose,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id || !open) return;

            setLoading(true);
            try {
                const response = await getProductById(id);
                setName(response?.name || '');
                setDescription(response?.description || '');
                setPrice(response?.price || 0);
                setQuantity(response?.quantity || 0);
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, open]);

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Editar produto"
            actions={
                !loading && (
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                    </Box>
                )}
        >
            <DrawerContentLoader loading={loading}>
                <ProductForm
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    price={price}
                    setPrice={setPrice}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </DrawerContentLoader>
        </DrawerWrapper>
    )
}