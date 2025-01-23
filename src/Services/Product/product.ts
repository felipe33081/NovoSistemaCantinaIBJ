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

export const getProductList = async (filters: IGetProductListAsync) => {
    filters.orderBy = filters?.orderBy != undefined ? filters?.orderBy + "_" + filters?.orderByDirection?.toUpperCase() : undefined;
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
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível obter a lista de produtos");
        }
        throw err;
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
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível obter a lista de produtos");
        }
        throw err;
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
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível excluir o produto");
        }
        throw err;
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
        //Toast.showSuccessMessage("Produto adicionado com sucesso!");
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível cadastrar o produto");
        }
        throw err;
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
        //Toast.showSuccessMessage("Produto atualizado com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível atualizar um produto");
        }
        throw err;
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
        //Toast.showSuccessMessage("Produto excluído com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível excluir um produto");
        }
        throw err;
    }
}