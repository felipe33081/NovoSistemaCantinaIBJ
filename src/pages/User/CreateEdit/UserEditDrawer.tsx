import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import FormTextField from '../../../components/FormTextField';
import { PhoneMaskInput } from '../../../components/PhoneMaskField';
import { putUserEdit, getUserById } from '../../../Services/User/user';

interface UserEditDrawerProps {
    id: string | null;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function UserEditDrawer({
    id,
    open,
    onClose,
    onSuccess
}: UserEditDrawerProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(id ?? '');
                const userData = response;
                setName(userData.name);
                setEmail(userData.email);
                setPhone(userData.phoneNumber);
                setEmailVerified(userData.emailVerified);
                setUserStatus(userData.userStatus);
                setLoading(true);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = {
            name,
            email,
            phoneNumber,
            emailVerified
        };
        await putUserEdit(id ?? '', user);
        onSuccess();
        onClose();
    };

    if (!loading) {
        return <div className="loading-editing"></div>;
    }

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Editar usuário"
            actions={
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                </Box>
            }
        >
            <Box component="form" display="flex" flexDirection="column" gap={2}>
                <FormTextField
                    id="name"
                    name="name"
                    label="Nome"
                    type="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    value={email}
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
                        value={phoneNumber}
                    />
                    <FormTextField
                        id="userStatus"
                        name="userStatus"
                        label="Status"
                        required={false}
                        disabled={true}
                        onChange={(e) => setUserStatus(e.target.value)}
                        value={userStatus}
                    />
                </Box>
            </Box>
        </DrawerWrapper>
    )
}