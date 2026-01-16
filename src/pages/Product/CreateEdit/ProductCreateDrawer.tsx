import React, { useEffect, useState } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import { ICreateDrawerProps, IProductCreateModel } from '../../../utils/interfaces/interfaces';
import { postProductCreate } from '../../../Services/Product/product';
import { ProductForm } from '../../../components/Product/ProductForm';

export default function ProductCreateDrawer({
    open,
    onClose,
    onSuccess
}: ICreateDrawerProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        if (open) {
            setName('');
            setDescription('');
            setPrice(0);
            setQuantity(0);
        }
    }, [open]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const product: IProductCreateModel = {
                name,
                description: description || null,
                price: Number(price),
                quantity: Number(quantity)
            };
            await postProductCreate(product);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        }
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Novo produto"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Criar</Button>
                </Box>
            }
        >
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
        </DrawerWrapper>
    )
}