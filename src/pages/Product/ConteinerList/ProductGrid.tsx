import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { DataTable } from '../../../components/DataTable';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { IGetProductListAsync } from '../../../utils/interfaces/interfaces';
import { deleteProductById, getProductList } from '../../../Services/Product/product';
import { getProductColumns } from './ProductList';
import { PageHeader } from '../../../components/PageHeaderProps';
import ProductCreateDrawer from '../CreateEdit/ProductCreateDrawer';
import ProductEditDrawer from '../CreateEdit/ProductEditDrawer';
import { useFetchList } from '../../../hooks/useFetchList';
import { buildOrderBy } from '../../../utils/gridHelpers';

export default function ProductGrid() {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [editProductId, setEditProductId] = useState<number | null>(null);

    const { rows, totalRows, loading, fetchData } = useFetchList({
        fetchService: getProductList,
        buildParams: (page, size, filters, sort) => {
            const quickFilter = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "name") acc.name = filter.value;
                if (filter.field === "description") acc.description = filter.value;
                return acc;
            }, {} as IGetProductListAsync);

            return {
                page,
                size,
                name: mappedFilters.name,
                description: mappedFilters.description,
                searchString: quickFilter,
                orderBy: buildOrderBy(sort || [])
            };
        }
    });

    useEffect(() => {
        fetchData(currentPage, rowsPerPage, filterModel, sortModel);
    }, [currentPage, rowsPerPage, filterModel, sortModel]);

    const handleDelete = async (id: number) => {
        await deleteProductById(id);
        fetchData(currentPage, rowsPerPage, filterModel, sortModel);
    };

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    const handleSortChange = (newSortModel: GridSortModel) => {
        setSortModel(newSortModel);
        setCurrentPage(0);
    };

    const handleEdit = (id: number) => {
        setEditProductId(id);
        setOpenEditDrawer(true);
    };

    const handleRefresh = () => {
        fetchData(currentPage, rowsPerPage, filterModel, sortModel);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <PageHeader
                title="Produtos"
                onRefresh={handleRefresh}
                onCreate={() => setOpenCreateDrawer(true)}
            />

            <ProductCreateDrawer
                open={openCreateDrawer}
                onClose={() => setOpenCreateDrawer(false)}
                onSuccess={handleRefresh}
            />

            <ProductEditDrawer
                open={openEditDrawer}
                onClose={() => {
                    setOpenEditDrawer(false);
                }}
                onSuccess={() => {
                    handleRefresh();
                    setOpenEditDrawer(false);
                    setEditProductId(null);
                }}
                id={editProductId ?? 0}
            />

            <Grid>
                <DataTable
                    rows={rows}
                    columns={
                        getProductColumns(handleDelete, handleEdit)
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