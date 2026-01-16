import { GridSortModel } from '@mui/x-data-grid';

export const buildOrderBy = (sort: GridSortModel, defaultField = "CreatedAt"): string => {
    const orderBy = sort[0]?.field || defaultField;
    const orderByDirection = sort[0]?.sort?.toUpperCase() || "DESC";
    return `${orderBy}_${orderByDirection}`;
};