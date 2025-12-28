import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { DataTable } from '../../../components/DataTable';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { IGetCustomerPersonListFilter } from '../../../utils/interfaces/interfaces';
import { deleteCustomerById, getCustomerList } from '../../../Services/Customer/customer';
import { getCustomerColumns } from './CustomerList';
import { PageHeader } from '../../../components/PageHeaderProps';
import CustomerEditDrawer from '../CreateEdit/CustomerEditDrawer';
import CustomerCreateDrawer from '../CreateEdit/CustomerCreateDrawer';

export default function CustomerGrid() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const isLoading = useRef(false);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [editCustomerId, setEditCustomerId] = useState<number | null>(null);

    const fetchCustomers = async (page: number, size: number, filters: GridFilterModel, sort: GridSortModel) => {
        if (isLoading.current) return;

        setLoading(true);
        isLoading.current = true;

        try {
            const quickFilterValue = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "name") acc.name = filter.value;
                if (filter.field === "phone") acc.phone = filter.value;
                return acc;
            }, {} as IGetCustomerPersonListFilter);

            const orderBy = sort[0]?.field || "CreatedAt";
            const orderByDirection = sort[0]?.sort?.toUpperCase() || "DESC";

            const params: IGetCustomerPersonListFilter = {
                page,
                size,
                name: mappedFilters.name,
                phone: mappedFilters.phone,
                searchString: quickFilterValue,
                orderBy: `${orderBy}_${orderByDirection}`
            };

            const response = await getCustomerList(params);
            setRows(response.data || []);
            setTotalRows(response.totalItems || 0);

            setCurrentPage(page);
        } catch (error) {
            console.error('Erro ao buscar lista de clientes:', error);
        } finally {
            setLoading(false);
            isLoading.current = false;
        }
    };

    useEffect(() => {
        fetchCustomers(currentPage, rowsPerPage, filterModel, sortModel);
    }, [currentPage, rowsPerPage, filterModel, sortModel]);

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    const handleDelete = async (id: number) => {
        await deleteCustomerById(id);
        fetchCustomers(currentPage, rowsPerPage, filterModel, sortModel);
    };

    const handleSortChange = (newSortModel: GridSortModel) => {
        setSortModel(newSortModel);
        setCurrentPage(0);
    };

    const handleEdit = (id: number) => {
        setEditCustomerId(id);
        setOpenEditDrawer(true);
    };

    const handleRefresh = () => {
        fetchCustomers(currentPage, rowsPerPage, filterModel, sortModel);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <PageHeader
                title="Clientes"
                onRefresh={handleRefresh}
                onCreate={() => setOpenCreateDrawer(true)}
            />

            <CustomerCreateDrawer
                open={openCreateDrawer}
                onClose={() => setOpenCreateDrawer(false)}
                onSuccess={handleRefresh}
            />

            <CustomerEditDrawer
                open={openEditDrawer}
                onClose={() => {
                    setOpenEditDrawer(false);
                }}
                onSuccess={() => {
                    handleRefresh();
                    setOpenEditDrawer(false);
                    setEditCustomerId(null);
                }}
                id={editCustomerId ?? 0}
            />

            <Grid>
                <DataTable
                    rows={rows}
                    columns={
                        getCustomerColumns(handleDelete, handleEdit)
                    }
                    onEdit={handleEdit}
                    totalRows={totalRows}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    loading={loading}
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={setRowsPerPage}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />
            </Grid>
        </Box>
    );
}