import axios from 'axios';
import { pickBy } from 'lodash';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import { Toast } from '../../utils/ToastUtils';
import {
    ICustomerPersonCreateModel,
    ICustomerPersonReadModel,
    ICustomerPersonUpdateModel,
    IGetCustomerPersonListFilter,
    IListDataPagination
} from '../../utils/interfaces/interfaces';
import { handleApiError } from '../../utils/handleApiError';

export const getCustomerList = async (filters: IGetCustomerPersonListFilter) => {
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    let token = await getToken();
    let url = Environment.BASE_URL + "/CustomerPerson";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try {
        let result = await axios.get(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const fetchCustomerList = async (filters: IGetCustomerPersonListFilter) => {
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    const token = await getToken();
    const url = Environment.BASE_URL + "/CustomerPerson";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try {
        const result = await axios.get<IListDataPagination<ICustomerPersonReadModel>>(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const getCustomerById = async (id: number) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/CustomerPerson/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.get<ICustomerPersonReadModel>(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const postCustomerCreate = async (data: ICustomerPersonCreateModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + "/CustomerPerson";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.post(url, data, config);
        Toast.success("Cliente adicionado com sucesso!");
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const putCustomerEdit = async (id: number, data: ICustomerPersonUpdateModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/CustomerPerson/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        Toast.success("Cliente atualizado com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const putResetAccountCustomer = async (id: number) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/CustomerPerson/${id}/resetAccount`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, null, config);
        Toast.success("Cliente atualizado com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const putBalanceCustomer = async (id: number, data: number) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/CustomerPerson/${id}/updateBalance`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        Toast.success("Saldo atualizado com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const deleteCustomerById = async (id: number) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/CustomerPerson/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.delete(url, config);
        Toast.success("Cliente excluído com sucesso!");
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}