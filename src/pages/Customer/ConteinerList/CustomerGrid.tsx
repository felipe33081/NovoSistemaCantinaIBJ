import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../../../internals/components/Copyright';
import { DataTable } from '../../../components/DataTable';
import { GridFilterModel } from '@mui/x-data-grid';
import { IGetCustomerPersonListFilter } from '../../../utils/interfaces/interfaces';
import { getCustomerList } from '../../../Services/Customer/customer';
import { customerColumns } from './CustomerList';

export default function CustomerGrid() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const isLoading = useRef(false);

    const fetchCustomers = async (page: number, size: number, filters: GridFilterModel) => {
        if (isLoading.current) return;

        setLoading(true);
        isLoading.current = true;

        try {
            const quickFilterValue = filters.quickFilterValues?.[0] ?? "";

            ///TODO: validar filtros possíveis
            const mappedFilters = filters.items.reduce((acc, filter) => {
                if (filter.field === "name") acc.name = filter.value;
                if (filter.field === "phone") acc.phone = filter.value;
                return acc;
            }, {} as IGetCustomerPersonListFilter);

            const params: IGetCustomerPersonListFilter = {
                page,
                size,
                name: mappedFilters.name,
                phone: mappedFilters.phone,
                searchString: quickFilterValue
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
        fetchCustomers(currentPage, rowsPerPage, filterModel);
    }, [currentPage, rowsPerPage, filterModel]);

    const handleFilterChange = (newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
        setCurrentPage(0);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Clientes
            </Typography>
            <Grid>
                <DataTable
                    rows={rows}
                    columns={customerColumns}
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