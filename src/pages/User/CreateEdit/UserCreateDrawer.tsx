import React, { useEffect, useState } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import FormTextField from '../../../components/FormTextField';
import { PhoneMaskInput } from '../../../components/PhoneMaskField';
import PasswordInput from '../../../components/PasswordField';
import { postUserCreate } from '../../../Services/User/user';
import { ICreateDrawerProps } from '../../../utils/interfaces/interfaces';

export default function UserCreateDrawer({
    open,
    onClose,
    onSuccess
}: ICreateDrawerProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (open) {
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
        }
    }, [open]);

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            const user = { name, email, phoneNumber, password };
            await postUserCreate(user);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Novo usuário"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Criar</Button>
                </Box>
            }
        >
            {/* não tá dando erro ao tentar salvar o form sem preencher os campos obrigatorios */}
            {/* Adicionar validateForm */}
            <Box component="form" display="flex" flexDirection="column" mt={2} gap={3}>
                <FormTextField
                    id="name"
                    name="name"
                    label="Nome"
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <FormTextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    required={true}
                    placeholder="email@host.com"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
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
                    <PasswordInput
                        id="password"
                        label="Senha Temporária"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Box>
            </Box>

        </DrawerWrapper>
    )
}