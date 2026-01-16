import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { DataTable } from '../../../components/DataTable';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { IGetOrderListAsync } from '../../../utils/interfaces/interfaces';
import { deleteOrderById, getOrderList } from '../../../Services/Order/order';
import { getOrderColumns } from './OrderList';
import { PageHeader } from '../../../components/PageHeaderProps';
import OrderCreateDrawer from '../CreateEdit/OrderCreateDrawer';
import OrderEditDrawer from '../CreateEdit/OrderEditDrawer';
import { buildOrderBy } from '../../../utils/gridHelpers';
import { useFetchList } from '../../../hooks/useFetchList';
import ConfirmDialog from '../../../components/Shared/ConfirmDialog';
import { useDelete } from '../../../hooks/useDelete';

export default function OrderGrid() {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [editOrderId, setEditOrderId] = useState<number | null>(null);
    const {
        deleteId,
        loading: loadingDelete,
        handleDeleteClick,
        handleConfirmDelete,
        handleClose
    } = useDelete({
        apiDeleteFunction: deleteOrderById,
        successMessage: "Pedido excluído com sucesso!",
        onSuccess: () => fetchData(currentPage, rowsPerPage, filterModel, sortModel)
    });

    const { rows, totalRows, loading, fetchData } = useFetchList({
        fetchService: getOrderList,
        buildParams: (page, size, filters, sort) => {
            const quickFilterValue = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "id") acc.id = filter.value;
                if (filter.field === "status") acc.status = filter.value;
                return acc;
            }, {} as IGetOrderListAsync);

            return {
                page,
                size,
                id: mappedFilters.id,
                status: mappedFilters.status,
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

    const handleSortChange = (newSortModel: GridSortModel) => {
        setSortModel(newSortModel);
        setCurrentPage(0);
    };

    const handleEdit = (id: number) => {
        setEditOrderId(id);
        setOpenEditDrawer(true);
    };

    const handleRefresh = () => {
        fetchData(currentPage, rowsPerPage, filterModel, sortModel);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <PageHeader
                title="Pedidos"
                onRefresh={handleRefresh}
                onCreate={() => setOpenCreateDrawer(true)}
            />

            <OrderCreateDrawer
                open={openCreateDrawer}
                onClose={() => setOpenCreateDrawer(false)}
                onSuccess={handleRefresh}
            />

            <OrderEditDrawer
                open={openEditDrawer}
                onClose={() => {
                    setOpenEditDrawer(false);
                }}
                onSuccess={() => {
                    handleRefresh();
                    setOpenEditDrawer(false);
                    setEditOrderId(null);
                }}
                id={editOrderId ?? 0}
            />

            <Grid>
                <DataTable
                    rows={rows}
                    columns={
                        getOrderColumns(handleDeleteClick, handleEdit)
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

                <ConfirmDialog
                    open={deleteId !== null}
                    onClose={handleClose}
                    onConfirm={handleConfirmDelete}
                    title="Excluir Pedido"
                    message="Tem certeza que deseja excluir este pedido? Essa ação não pode ser desfeita."
                    loading={loadingDelete}
                />
            </Grid>
        </Box>
    );
}