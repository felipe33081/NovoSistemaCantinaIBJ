import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { deleteUserById, getUserList } from '../../../Services/User/user';
import { DataTable } from '../../../components/DataTable';
import { IGetUserListFilter } from '../../../utils/interfaces/interfaces';
import { GridFilterModel } from '@mui/x-data-grid';
import UserCreateDrawer from '../CreateEdit/UserCreateDrawer';
import { getUserColumns } from './UserList';
import UserEditDrawer from '../CreateEdit/UserEditDrawer';
import { PageHeader } from '../../../components/PageHeaderProps';
import { useFetchList } from '../../../hooks/useFetchList';

export default function UserGrid() {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [editUserId, setEditUserId] = useState<string | null>(null);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const paginationState = useRef<Record<number, string>>({});

    const { rows, totalRows, loading, fetchData } = useFetchList({
        fetchService: getUserList,
        onSuccess: (response: any, page: number) => {
            paginationState.current[page + 1] = response.paginationToken || null;
        },
        buildParams: (page, size, filters) => {
            const quickFilter = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "name") acc.name = filter.value;
                if (filter.field === "email") acc.email = filter.value;
                return acc;
            }, {} as IGetUserListFilter);

            return {
                page,
                size,
                paginationToken: paginationState.current[page],
                name: mappedFilters.name ?? quickFilter,
                email: mappedFilters.email ?? ""
            };
        }
    });

    useEffect(() => {
        fetchData(currentPage, rowsPerPage, filterModel);
    }, [currentPage, rowsPerPage, filterModel]);

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    const handleDelete = async (id: string) => {
        await deleteUserById(id);
        fetchData(currentPage, rowsPerPage, filterModel);
    };

    const handleEdit = (id: string) => {
        setEditUserId(id);
        setOpenEditDrawer(true);
    };

    const handleRefresh = () => {
        fetchData(currentPage, rowsPerPage, filterModel);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <PageHeader
                title="Usuários"
                onRefresh={handleRefresh}
                onCreate={() => setOpenCreateDrawer(true)}
            />

            <UserCreateDrawer
                open={openCreateDrawer}
                onClose={() => setOpenCreateDrawer(false)}
                onSuccess={handleRefresh}
            />

            <UserEditDrawer
                open={openEditDrawer}
                onClose={() => {
                    setOpenEditDrawer(false);
                }}
                onSuccess={() => {
                    handleRefresh();
                    setOpenEditDrawer(false);
                    setEditUserId(null);
                }}
                id={editUserId ?? ''}
            />

            <Grid>
                <DataTable
                    rows={rows}
                    columns={
                        getUserColumns(handleDelete, handleEdit)
                    }
                    onEdit={handleEdit}
                    totalRows={totalRows}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    loading={loading}
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={setRowsPerPage}
                    onFilterChange={handleFilterChange}
                />
            </Grid>
        </Box>
    );
}