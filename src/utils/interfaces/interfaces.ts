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

export interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export interface PriceInputProps {
    label: string;
    value?: string | number;
    required?: boolean;
    name?: string;
    onChange: (e: any) => void;
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

export interface ICustomTabsProps {
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    labels: string[];
}

export interface ICreateDrawerProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface IDrawerWrapperProps {
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

export interface ISignInFormFieldsProps {
    emailError: boolean;
    emailErrorMessage: string;
    passwordError: boolean;
    passwordErrorMessage: string;
    validateInputs: () => boolean;
}

export interface IEditDrawerProps {
    id: number;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface ICustomerFormTabsProps {
    tabIndex: number;
    handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
    name: string;
    setName: (val: string) => void;
    phoneNumber: string;
    setPhone: (val: string) => void;
    balance: number;
    setBalance: (val: number) => void;
}

export interface IUserEditDrawerProps {
    id: string;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface IUserFormTabsProps {
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

export interface IUserAddGroupDrawerProps {
    id?: string;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export interface IOrderAddProductDrawerProps {
    open: boolean;
    onClose: () => void;
    onAddProduct: (item: any) => void;
}

export interface IUserTabsPanelProps {
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

export interface ICustomerTabsPanelProps {
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

export interface IOrderCreateModel {
    customerPersonId?: number | null
    customerName?: string | null
    products: IOrderProductItem[]
}

export interface IOrderProductItem {
    productId: number
    quantity: number
}

export interface IUseSubmitOrderFormProps {
    id: number;
    customerName: string | null;
    customerPersonId: number | null;
    data: any[];
    onSuccess: () => void;
    onClose: () => void;
}

export interface IUseSubmitUserFormProps {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export interface IUseSubmitCustomerFormProps {
    id: number;
    name: string;
    phoneNumber: string;
    balance: number;
    onSuccess: () => void;
    onClose: () => void;
}

export interface IUseSubmitProductFormProps {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    onSuccess: () => void;
    onClose: () => void;
}

export interface ForgotPasswordProps {
    open: boolean;
    handleClose: () => void;
}

export interface AppThemeProps {
    children: React.ReactNode;
    disableCustomTheme?: boolean;
    themeComponents?: ThemeOptions['components'];
}

export interface IOrderTabsPanelProps {
    id: number;
    tabIndex: number;
    setTabIndex: (value: number) => void;
    customerName?: string;
    customerPersonId?: string | number;
    customerPersonDisplay?: string;
    rows: any[];
    totalRows?: number;
    loading: boolean;
    columns: GridColDef[];
    onAddProductDrawer: () => void;
}
