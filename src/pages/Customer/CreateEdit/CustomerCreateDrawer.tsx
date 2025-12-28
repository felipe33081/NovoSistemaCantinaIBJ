import React, { useState } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import FormTextField from '../../../components/FormTextField';
import { PhoneMaskInput } from '../../../components/PhoneMaskField';
import { postCustomerCreate } from '../../../Services/Customer/customer';
import { CustomerCreateDrawerProps, ICustomerPersonCreateModel } from '../../../utils/interfaces/interfaces';

export default function CustomerCreateDrawer({
    open,
    onClose,
    onSuccess
}: CustomerCreateDrawerProps) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhone] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const customer: ICustomerPersonCreateModel = {
            name,
            phone: phoneNumber,
            email: null
        };
        await postCustomerCreate(customer);
        onSuccess();
        onClose();
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Novo cliente"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Criar</Button>
                </Box>
            }
        >
            {/* TODO: não tá dando erro ao tentar salvar o form sem preencher os campos obrigatorios */}
            {/* TODO: Adicionar validateForm */}
            <Box component="form" display="flex" flexDirection="column" mt={2} gap={3}>
                <FormTextField
                    id="name"
                    name="name"
                    label="Nome"
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Box component="form" display="flex" gap={3}>
                    <PhoneMaskInput
                        id="phoneNumber"
                        label="Telefone"
                        fullWidth
                        required={true}
                        placeholder="(00) 00000-0000"
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                </Box>
            </Box>

        </DrawerWrapper>
    )
}