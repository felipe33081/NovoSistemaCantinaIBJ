import axios from 'axios';
import { pickBy } from 'lodash';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import {
    IGetProductListAsync,
    IListDataPagination,
    IProductCreateModel,
    IProductReadModel,
    IProductUpdateModel
} from '../../utils/interfaces/interfaces';
import { Toast } from '../../utils/ToastUtils';
import { handleApiError } from '../../utils/handleApiError';


export const getProductList = async (filters: IGetProductListAsync) => {
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    const token = await getToken();
    const url = Environment.BASE_URL + "/Product";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try {
        const result = await axios.get(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const fetchProductList = async (filters: IGetProductListAsync) => {
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    const token = await getToken();
    const url = Environment.BASE_URL + "/Product";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }
    try {
        const result = await axios.get<IListDataPagination<IProductReadModel>>(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const getProductById = async (id: number) => {
    const token = await getToken();
    const url = Environment.BASE_URL + `/Product/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.get<IProductReadModel>(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const postProductCreate = async (data: IProductCreateModel) => {
    const token = await getToken();
    const url = Environment.BASE_URL + "/Product";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.post(url, data, config);
        Toast.success("Produto adicionado com sucesso!");
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const putProductEdit = async (id: number, data: IProductUpdateModel) => {
    const token = await getToken();
    const url = Environment.BASE_URL + `/Product/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        Toast.success("Produto atualizado com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const deleteProductById = async (id: number) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/Product/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.delete(url, config);
        Toast.success("Produto excluído com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}