import React, { useState } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import FormTextField from '../../../components/FormTextField';
import { PhoneMaskInput } from '../../../components/PhoneMaskField';
import PasswordInput from '../../../components/PasswordField';
import { postUserCreate } from '../../../Services/User/user';

interface UserCreateDrawerProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function UserCreateDrawer({
    open,
    onClose,
    onSuccess
}: UserCreateDrawerProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = { name, email, phoneNumber, password };
        await postUserCreate(user);
        onSuccess();
        onClose();
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Adicionar novo usuário"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                </Box>
            }
        >
            {/* não tá dando erro ao tentar salvar o form sem preencher os campos obrigatorios */}
            <Box component="form" display="flex" flexDirection="column" gap={2}>
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
                <Box component="form" display="flex" gap={2}>
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