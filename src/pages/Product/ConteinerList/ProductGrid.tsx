import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../../../internals/components/Copyright';
import { DataTable } from '../../../components/DataTable';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { IGetProductListAsync } from '../../../utils/interfaces/interfaces';
import { getProductList } from '../../../Services/Product/product';
import { productColumns } from './ProductList';

export default function ProductGrid() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const isLoading = useRef(false);

    const fetchProducts = async (page: number, size: number, filters: GridFilterModel, sort: GridSortModel) => {
        if (isLoading.current) return;

        setLoading(true);
        isLoading.current = true;

        try {
            const quickFilterValue = filters.quickFilterValues?.[0] ?? "";

            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "name") acc.name = filter.value;
                if (filter.field === "description") acc.description = filter.value;
                return acc;
            }, {} as IGetProductListAsync);

            const orderBy = sort[0]?.field || "CreatedAt";
            const orderByDirection = sort[0]?.sort?.toUpperCase() || "DESC";

            const params: IGetProductListAsync = {
                page,
                size,
                name: mappedFilters.name,
                description: mappedFilters.description,
                searchString: quickFilterValue,
                orderBy: `${orderBy}_${orderByDirection}`
            };
            const response = await getProductList(params);
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
        fetchProducts(currentPage, rowsPerPage, filterModel, sortModel);
    }, [currentPage, rowsPerPage, filterModel, sortModel]);

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    const handleSortChange = (newSortModel: GridSortModel) => {
        setSortModel(newSortModel);
        setCurrentPage(0);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Produtos
            </Typography>
            <Grid>
                <DataTable
                    rows={rows}
                    columns={productColumns}
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
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}