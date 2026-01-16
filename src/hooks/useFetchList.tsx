import { useState, useRef, useCallback } from 'react';
import { GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { IUseFetchListProps } from '../utils/interfaces/interfaces';

export const useFetchList = <TParams, TResponse extends { data?: any[], totalItems?: number }>(
    { fetchService, buildParams, onSuccess }: IUseFetchListProps<TParams, TResponse>
) => {
    const [rows, setRows] = useState<any[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const isLoadingRef = useRef(false);

    const fetchData = useCallback(async (
        page: number,
        size: number,
        filters: GridFilterModel,
        sort?: GridSortModel
    ) => {
        if (isLoadingRef.current) return;

        setLoading(true);
        isLoadingRef.current = true;

        try {
            const params = buildParams(page, size, filters, sort);
            const response = await fetchService(params);

            setRows(response.data || []);
            setTotalRows(response.totalItems || 0);

            if (onSuccess) {
                onSuccess(response, page);
            }

        } catch (error) {
            console.error('Erro ao buscar lista:', error);
        } finally {
            setLoading(false);
            isLoadingRef.current = false;
        }
    }, [fetchService, buildParams, onSuccess]);

    return { rows, totalRows, loading, fetchData, setRows };
};