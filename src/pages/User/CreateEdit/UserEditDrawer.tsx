import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button, Paper } from '@mui/material';
import FormTextField from '../../../components/FormTextField';
import { PhoneMaskInput } from '../../../components/PhoneMaskField';
import { getUserById } from '../../../Services/User/user';
import { CustomTabPanel, CustomTabs } from '../../../components/CustomTabPanel';
import { Checkbox, FormControlLabel } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { UserEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { useTabs } from '../../../hooks/useTabs';
import { useSubmitUserForm } from '../../../hooks/useSubmitUserForm';

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
    const { tabIndex, handleChangeTab } = useTabs();
    const { handleSubmit } = useSubmitUserForm({
        id,
        name,
        email,
        phoneNumber,
        emailVerified,
        onSuccess,
        onClose,
    });

    useEffect(() => {
        if (!id || !open) return;

        setName('');
        setEmail('');
        setPhone('');
        setEmailVerified(false);
        setUserStatus('');

        const fetchUser = async () => {
            try {
                const response = await getUserById(id);
                setName(response.name || '');
                setEmail(response.email || '');
                setPhone(response.phoneNumber || '');
                setEmailVerified(response.emailVerified ?? false);
                setUserStatus(response.userStatus || '');
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUser();
    }, [id, open]);

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
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: "#fff",
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    mt: 2,
                }}
            >
                <CustomTabs
                    value={tabIndex}
                    onChange={handleChangeTab}
                    labels={["Informações", "Grupos"]}
                />

                <CustomTabPanel value={tabIndex} index={0}>
                    {/* Conteúdo da aba Informações */}
                    <Box component="form" display="flex" flexDirection="column" gap={3}>
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
                        <Box component="form" display="flex" gap={3}>
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
                        <FormControlLabel
                            sx={{
                                mt: -4
                            }}
                            control={
                                <Checkbox
                                    checked={emailVerified}
                                    onChange={(e) => setEmailVerified(e.target.checked)}
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    sx={{
                                        color: "#c2410c",
                                        '&.Mui-checked': {
                                            borderColor: 'white',
                                            color: "#c2410c",
                                            backgroundColor: 'white'
                                        }
                                    }}
                                />
                            }
                            label="E-mail verificado"
                        />
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabIndex} index={1}>
                    {/* Conteúdo da aba Grupos */}
                </CustomTabPanel>
            </Paper>

        </DrawerWrapper>
    )
}