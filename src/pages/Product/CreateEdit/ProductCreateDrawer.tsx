import React, { useState } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import FormTextField from '../../../components/FormTextField';
import { PhoneMaskInput } from '../../../components/PhoneMaskField';
import { ICreateDrawerProps, IProductCreateModel } from '../../../utils/interfaces/interfaces';
import { postProductCreate } from '../../../Services/Product/product';
import CurrencyInput from '../../../components/CurrencyInput';

export default function ProductCreateDrawer({
    open,
    onClose,
    onSuccess
}: ICreateDrawerProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

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
            <Box component="form" display="flex" flexDirection="column" mt={2} gap={3}>
                <FormTextField
                    id="name"
                    name="name"
                    label="Nome do Produto"
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <FormTextField
                    id="description"
                    name="description"
                    label="Descrição"
                    required={false}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Box display="flex" gap={2}>
                    <CurrencyInput
                        label="Preço"
                        required={true}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <FormTextField
                        id="quantity"
                        name="quantity"
                        label="Quantidade"
                        type="number"
                        fullWidth
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </Box>
            </Box>

        </DrawerWrapper>
    )
}