import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { getUserById, getUserGroupsList, removeUserGroupEdit } from '../../../Services/User/user';
import { IUserEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { useTabs } from '../../../hooks/useTabs';
import { useSubmitUserForm } from '../../../hooks/User/useSubmitUserForm';
import { getGroupsColumns } from '../ConteinerList/GroupsList';
import { UserTabsPanel } from '../../../components/User/UserTabsPanelProps';
import { DrawerContentLoader } from '../../../components/DrawerContentLoader';

export default function UserEditDrawer({
    id,
    open,
    onClose,
    onSuccess
}: IUserEditDrawerProps) {
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const { tabIndex, setTabIndex } = useTabs();
    const [loading, setLoading] = useState(true);
    const [openAddGroupDrawer, setOpenAddGroupDrawer] = useState(false);
    const { handleSubmit } = useSubmitUserForm({
        id,
        name,
        email,
        phoneNumber,
        emailVerified,
        onSuccess,
        onClose,
    });

    const loadAllData = async () => {
        if (!id) return;
        setLoading(true);

        try {
            const [userRes, groupsRes] = await Promise.all([
                getUserById(id),
                getUserGroupsList(id)
            ]);

            setName(userRes.name || '');
            setEmail(userRes.email || '');
            setPhone(userRes.phoneNumber || '');
            setEmailVerified(userRes.emailVerified ?? false);
            setUserStatus(userRes.userStatus || '');
            setRows(groupsRes.data || []);
            setTotalRows(groupsRes.totalItems || 0);

        } catch (error) {
            console.error('Erro ao carregar dados do drawer:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && id) {
            loadAllData();
        } else {
            setLoading(true);
            setTabIndex(0);
        }
    }, [id, open]);

    const handleDelete = async (groupName: string) => {
        const data = { groupName };
        await removeUserGroupEdit(id ?? '', data);
        const response = await getUserGroupsList(id ?? '');
        setRows(response.data);
    };

    const handleRefresh = () => {
        loadAllData();
    };

    return (
        <DrawerWrapper
            open={open}
            onClose={onClose}
            title="Editar usuário"
            actions={
                !loading && (
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                    </Box>
                )
            }
        >
            <DrawerContentLoader loading={loading}>
                <UserTabsPanel
                    id={id}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                    name={name}
                    email={email}
                    phoneNumber={phoneNumber}
                    userStatus={userStatus}
                    emailVerified={emailVerified}
                    setName={setName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setEmailVerified={setEmailVerified}
                    handleRefresh={handleRefresh}
                    rows={rows}
                    totalRows={totalRows}
                    loading={loading}
                    columns={getGroupsColumns(handleDelete)}
                    openAddGroupDrawer={openAddGroupDrawer}
                    setOpenAddGroupDrawer={setOpenAddGroupDrawer}
                />
            </DrawerContentLoader>
        </DrawerWrapper>
    )
}