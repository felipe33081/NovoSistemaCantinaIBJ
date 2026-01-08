import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataTable } from '../../../components/DataTable';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { IGetOrderListAsync } from '../../../utils/interfaces/interfaces';
import { deleteOrderById, getOrderList } from '../../../Services/Order/order';
import { getOrderColumns } from './OrderList';
import { PageHeader } from '../../../components/PageHeaderProps';

export default function OrderGrid() {
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
    const [editOrderId, setEditOrderId] = useState<number | null>(null);

    const fetchOrders = async (page: number, size: number, filters: GridFilterModel, sort: GridSortModel) => {
        if (isLoading.current) return;

        setLoading(true);
        isLoading.current = true;

        try {
            const quickFilterValue = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "id") acc.id = filter.value;
                if (filter.field === "status") acc.status = filter.value;
                return acc;
            }, {} as IGetOrderListAsync);

            const orderBy = sort[0]?.field || "CreatedAt";
            const orderByDirection = sort[0]?.sort?.toUpperCase() || "DESC";

            const params: IGetOrderListAsync = {
                page,
                size,
                id: mappedFilters.id,
                status: mappedFilters.status,
                searchString: quickFilterValue,
                orderBy: `${orderBy}_${orderByDirection}`
            };

            const response = await getOrderList(params);
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
        fetchOrders(currentPage, rowsPerPage, filterModel, sortModel);
    }, [currentPage, rowsPerPage, filterModel, sortModel]);

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    const handleDelete = async (id: number) => {
        await deleteOrderById(id);
        fetchOrders(currentPage, rowsPerPage, filterModel, sortModel);
    };

    const handleSortChange = (newSortModel: GridSortModel) => {
        setSortModel(newSortModel);
        setCurrentPage(0);
    };

    const handleEdit = (id: number) => {
        setEditOrderId(id);
        setOpenEditDrawer(true);
    };

    const handleRefresh = () => {
        fetchOrders(currentPage, rowsPerPage, filterModel, sortModel);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <PageHeader
                title="Pedidos"
                onRefresh={handleRefresh}
                onCreate={() => setOpenCreateDrawer(true)}
            />

            <Grid>
                <DataTable
                    rows={rows}
                    columns={
                        getOrderColumns(handleDelete, handleEdit)
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