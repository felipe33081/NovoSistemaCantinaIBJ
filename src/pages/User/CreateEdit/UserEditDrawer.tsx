import React, { useState, useEffect } from 'react';
import DrawerWrapper from '../../../components/DrawerWrapper';
import { Box, Button } from '@mui/material';
import { getUserById, getUserGroupsList, removeUserGroupEdit } from '../../../Services/User/user';
import { UserEditDrawerProps } from '../../../utils/interfaces/interfaces';
import { useTabs } from '../../../hooks/useTabs';
import { useSubmitUserForm } from '../../../hooks/User/useSubmitUserForm';
import { getGroupsColumns } from '../ConteinerList/GroupsList';
import { UserTabsPanel } from '../../../components/User/UserTabsPanelProps';

export default function UserEditDrawer({
    id,
    open,
    onClose,
    onSuccess
}: UserEditDrawerProps) {
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const { tabIndex, handleChangeTab, setTabIndex } = useTabs();
    const [loading, setLoading] = useState(false);
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

    const fetchUserGroups = async () => {
        try {
            const response = await getUserGroupsList(id ?? '');
            setRows(response.data);
            setTotalRows(response.totalItems || 0);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        if (!id || !open) return;

        setRows([]);
        const fetchUserGroups = async () => {
            try {
                const response = await getUserGroupsList(id ?? '');
                setRows(response.data);
                setTotalRows(response.totalItems || 0);

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchUserGroups();
    }, [id]);

    const handleDelete = async (groupName: string) => {
        const data = {
            groupName,
        };
        await removeUserGroupEdit(id ?? '', data);
        const response = await getUserGroupsList(id ?? '');
        setRows(response.data);
    };

    const handleRefresh = () => {
        fetchUserGroups();
    };

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
                setUserStatus={setUserStatus}
                setEmailVerified={setEmailVerified}
                handleRefresh={handleRefresh}
                rows={rows}
                totalRows={totalRows}
                loading={loading}
                columns={getGroupsColumns(handleDelete)}
                openAddGroupDrawer={openAddGroupDrawer}
                setOpenAddGroupDrawer={setOpenAddGroupDrawer}
            />
        </DrawerWrapper>
    )
}