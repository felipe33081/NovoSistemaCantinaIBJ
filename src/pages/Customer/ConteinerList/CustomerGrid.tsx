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
import { useFetchList } from '../../../hooks/useFetchList';
import { buildOrderBy } from '../../../utils/gridHelpers';

export default function CustomerGrid() {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [editCustomerId, setEditCustomerId] = useState<number | null>(null);

    const { rows, totalRows, loading, fetchData } = useFetchList({
        fetchService: getCustomerList,
        buildParams: (page, size, filters, sort) => {
            const quickFilterValue = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "name") acc.name = filter.value;
                if (filter.field === "phone") acc.phone = filter.value;
                return acc;
            }, {} as IGetCustomerPersonListFilter);

            return {
                page,
                size,
                name: mappedFilters.name,
                phone: mappedFilters.phone,
                searchString: quickFilterValue,
                orderBy: buildOrderBy(sort || [])
            };
        }
    });

    useEffect(() => {
        fetchData(currentPage, rowsPerPage, filterModel, sortModel);
    }, [currentPage, rowsPerPage, filterModel, sortModel]);

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    const handleDelete = async (id: number) => {
        await deleteCustomerById(id);
        fetchData(currentPage, rowsPerPage, filterModel, sortModel);
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
        fetchData(currentPage, rowsPerPage, filterModel, sortModel);
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