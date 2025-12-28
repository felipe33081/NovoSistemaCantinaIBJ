import { PaletteMode, TextFieldProps, ThemeOptions } from "@mui/material";
import { OrderStatusEnum, PaymentOfTypeEnum } from "../enums/enums";
import { ChangeEvent, ReactNode } from "react";
import { GridColDef, GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { MenuButtonProps } from "../../components/MenuButton";
import { MaskedInputProps } from "../../types/react-text-mask";

export interface IUserListType {
    queryData: any
    rowsPerPage: number
    setRowsPerPage: (page: number) => void
    page: number;
}

export interface IListDataPagination<T> {
    page: number
    totalPages: number
    totalItems: number
    data: T[];
    paginationToken: string
}

export interface IDashboardData {
    orderQuantity: number
    ordersFinished: number
    ordersInProgress: number
    ordersExcluded: number
    totalValueAmount: number
    totalValueFinishedAmount: number
    totalValueInProgressAmount: number
    averageOrderValueAmount: number
}

export interface IGetCustomerPersonListFilter {
    page: number
    size: number
    name?: string | null
    phone?: string | null
    searchString?: string | null
    isDeleted?: boolean | null
    orderBy?: string | null
    orderByDirection?: string | null
}

export interface ICustomerPersonReadModel {
    name?: string | null
    email?: string | null
    phone?: string | null
    balance?: number | null
    orders?: IOrderReadModel[] | null
}

export interface ICustomerPersonCreateModel {
    name: string
    email?: string | null
    phone: string
}

export interface ICustomerPersonUpdateModel {
    name: string
    email?: string | null
    phone: string
    balance: number
}

export interface IGetDashboardDataModel {
    initialDate?: Date | null
    finalDate?: Date | null
}

export interface IFinalizeOrderRequestModel {
    paymentOfType: PaymentOfTypeEnum
    paymentValue?: number | null
}

export interface IGetOrderListAsync {
    page: number
    size: number
    searchString?: string | null
    id?: number | null
    isDeleted?: boolean | null
    orderBy?: string | null
    orderByDirection?: string | null
    status?: OrderStatusEnum | null
}

export interface IOrderCreateModel {
    customerPersonId?: number | null
    customerName?: string | null
    products: IOrderProductCreateModel[]
}

export interface IOrderProductCreateModel {
    productId: number
    quantity: number
}

export interface IOrderUpdateModel {
    customerPersonId?: number | null
    customerName?: string | null
    products?: IOrderProductUpdateModel[] | null
}

export interface IOrderProductUpdateModel {
    productId: number
    quantity: number
}

export interface IOrderReadModel {
    customerPersonId?: number | null
    customerPersonDisplay: string
    customerName: string
    products: IOrderProductReadModel[]
    totalValue: number
    paymentValue?: number | null
    changeValue?: number | null
    status: OrderStatusEnum
    statusDisplay?: string | null
    paymentOfType?: PaymentOfTypeEnum | null
    paymentOfTypeDisplay?: string | null
}

export interface IOrderProductReadModel {
    productId: number
    productDisplay: string
    quantity: number
    name: string
    description: string
    price: number
}

export interface IProductReadModel {
    name: string
    description?: string | null
    price: number
    quantity: number
    disponibility: boolean
}

export interface IProductCreateModel {
    name: string
    description?: string | null
    price: number
    quantity: number
}

export interface IProductUpdateModel {
    name: string
    description?: string | null
    price: number
    quantity: number
    disponibility: boolean
}

export interface IProductModel {
    name: string
    description?: string | null
    price: number
    quantity: number
    disponibility: boolean
}

export interface IGetProductListAsync {
    page: number
    size: number
    name?: string
    description?: string | null
    searchString?: string | null
    isDeleted?: boolean | null
    orderBy?: string | null
    orderByDirection?: string | null
}

export interface IUserPostRequestModel {
    email: string
    phoneNumber: string
    name: string
    password: string
}

export interface IGroupRequestModel {
    groupName: string
}

export interface IUserPutRequestModel {
    name: string
    email: string
    phoneNumber: string
    emailVerified: boolean
}

export interface IGetUserListFilter {
    page: number
    size: number
    email?: string | null
    name?: string | null
    paginationToken?: string | null
}

export interface IUserGetResponseModel {
    id: string
    name: string
    phoneNumber: string
    email: string
    userStatus: string
    emailVerified: boolean
}

export interface CustomTabsProps {
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    labels: string[];
}

export interface UserCreateDrawerProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface CustomerCreateDrawerProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface DrawerWrapperProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: number | string;
    actions?: React.ReactNode;
    isWrapperChildren?: boolean;
}

export interface FormTextFieldProps extends Omit<TextFieldProps, 'label'> {
    label: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SignInFormFieldsProps {
    emailError: boolean;
    emailErrorMessage: string;
    passwordError: boolean;
    passwordErrorMessage: string;
    validateInputs: () => boolean;
}

export interface CustomerEditDrawerProps {
    id: number;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface CustomerFormTabsProps {
    tabIndex: number;
    handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
    name: string;
    setName: (val: string) => void;
    phoneNumber: string;
    setPhone: (val: string) => void;
    balance: number;
    setBalance: (val: number) => void;
}

export interface UserEditDrawerProps {
    id: string;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface UserFormTabsProps {
    tabIndex: number;
    handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
    name: string;
    setName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    phoneNumber: string;
    setPhone: (val: string) => void;
    userStatus: string;
    setUserStatus: (val: string) => void;
    emailVerified: boolean;
    setEmailVerified: (val: boolean) => void;
}

export interface ICustomDataGridType<T = any> {
    rows: any[];
    columns: GridColDef[];
    totalRows: number;
    currentPage?: number;
    rowsPerPage?: number;
    loading: boolean;
    setCurrentPage?: (value: number) => void;
    setRowsPerPage?: (value: number) => void;
    onFilterChange?: (filterModel: GridFilterModel) => void;
    onSortChange?: (sortModel: GridSortModel) => void;
    onEdit?: (id: T) => void;
    customRowId?: string;
}

export interface UserAddGroupDrawerProps {
    id?: string;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface UserTabsPanelProps {
    id: string;
    tabIndex: number;
    setTabIndex: (value: number) => void;
    name: string;
    email: string;
    phoneNumber: string;
    userStatus: string;
    emailVerified: boolean;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhone: (value: string) => void;
    setEmailVerified: (value: boolean) => void;
    handleRefresh: () => void;
    rows: any[];
    totalRows: number;
    loading: boolean;
    columns: GridColDef[];
    openAddGroupDrawer: boolean;
    setOpenAddGroupDrawer: (value: boolean) => void;
}

export interface CustomerTabsPanelProps {
    id: number;
    tabIndex: number;
    setTabIndex: (value: number) => void;
    name: string;
    phoneNumber: string;
    balance: number;
    setName: (value: string) => void;
    setPhone: (value: string) => void;
    setBalance: (value: number) => void;
    handleRefresh?: () => void;
    rows: any[];
    totalRows: number;
    loading?: boolean | null;
    columns?: GridColDef[];
}

export interface PageHeaderProps {
    title: string;
    onRefresh?: () => void;
    onCreate?: () => void;
    showRefresh?: boolean;
    createLabel?: string;
}

export interface ToggleColorModeProps extends MenuButtonProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

export interface PageLayoutProps {
    children: ReactNode;
}

export interface PasswordInputProps extends Omit<TextFieldProps, 'type'> {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomMaskedInputProps extends Omit<MaskedInputProps, 'ref'> {
    inputRef?: (ref: HTMLInputElement | null) => void;
}

export interface PhoneMaskInputProps extends Omit<TextFieldProps, 'inputRef'> {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface UseSubmitUserFormProps {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export interface UseSubmitCustomerFormProps {
    id: number;
    name: string;
    phoneNumber: string;
    balance: number;
    onSuccess: () => void;
    onClose: () => void;
}

export interface ForgotPasswordProps {
    open: boolean;
    handleClose: () => void;
}

export interface AppThemeProps {
    children: React.ReactNode;
    /**
     * This is for the docs site. You can ignore it or remove it.
     */
    disableCustomTheme?: boolean;
    themeComponents?: ThemeOptions['components'];
}
