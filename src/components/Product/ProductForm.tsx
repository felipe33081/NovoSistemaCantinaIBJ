import React from 'react';
import { Box } from '@mui/material';
import FormTextField from '../FormTextField';
import CurrencyInput from '../CurrencyInput';
import { IProductFormProps } from '../../utils/interfaces/interfaces';

export const ProductForm = ({
    name, setName,
    description, setDescription,
    price, setPrice,
    quantity, setQuantity
}: IProductFormProps) => {

    return (
        <Box component="form" display="flex" flexDirection="column" mt={2} gap={3}>
            <FormTextField
                id="name"
                name="name"
                label="Nome"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <FormTextField
                id="description"
                name="description"
                label="Descrição"
                required={false}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Box display="flex" gap={2}>
                <CurrencyInput
                    label="Preço"
                    required={true}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <FormTextField
                    id="quantity"
                    name="quantity"
                    label="Quantidade"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    InputProps={{ inputProps: { min: 0 } }}
                />
            </Box>
        </Box>
    );
};