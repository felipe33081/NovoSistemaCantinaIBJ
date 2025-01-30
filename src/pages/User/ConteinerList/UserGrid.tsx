import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../../../internals/components/Copyright';
import { getUserList } from '../../../Services/User/user';
import { userColumns } from './UserList';
import { DataTable } from '../../../components/DataTable';
import { IGetUserListFilter } from '../../../utils/interfaces/interfaces';
import { GridFilterModel } from '@mui/x-data-grid';

export default function UserGrid() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const paginationState = useRef<{ [key: number]: string | null }>({ 0: null });
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const isLoading = useRef(false);

    const fetchUsers = async (page: number, size: number, filters: GridFilterModel) => {
        if (isLoading.current) return;

        setLoading(true);
        isLoading.current = true;

        try {
            const quickFilterValue = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "name") acc.name = filter.value;
                if (filter.field === "email") acc.email = filter.value;
                return acc;
            }, {} as IGetUserListFilter);

            const params: IGetUserListFilter = {
                page,
                size,
                paginationToken: paginationState.current[page],
                name: mappedFilters.name ?? quickFilterValue,
                email: mappedFilters.email ?? ""
            };
            const response = await getUserList(params);
            setRows(response.data || []);
            setTotalRows(response.totalItems || 0);

            paginationState.current[page + 1] = response.paginationToken || null;

            setCurrentPage(page);
        } catch (error) {
            console.error('Erro ao buscar lista de usuários:', error);
        } finally {
            setLoading(false);
            isLoading.current = false;
        }
    };

    useEffect(() => {
        fetchUsers(currentPage, rowsPerPage, filterModel);
    }, [currentPage, rowsPerPage, filterModel]);

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Usuários
            </Typography>
            <Grid>
                <DataTable
                    rows={rows}
                    columns={userColumns}
                    totalRows={totalRows}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    loading={loading}
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={setRowsPerPage}
                    onFilterChange={handleFilterChange}
                />
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}