import { GridRowsProp } from "@mui/x-data-grid";
import { OrderStatusEnum, PaymentOfTypeEnum } from "../enums/enums";

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
    email?: string | null
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
    searchString?: string  | null
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
