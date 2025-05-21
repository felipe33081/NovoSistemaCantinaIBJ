import axios from 'axios';
import { pickBy } from 'lodash';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import {
    IFinalizeOrderRequestModel,
    IGetOrderListAsync,
    IListDataPagination,
    IOrderCreateModel,
    IOrderReadModel,
    IOrderUpdateModel
} from '../../utils/interfaces/interfaces';

export const getOrderList = async (filters: IGetOrderListAsync) => {
    const params = pickBy(filters, v => (v !== undefined && v !== '' && v !== false));

    const token = await getToken();
    const url = Environment.BASE_URL + "/Order";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }

    try {
        const result = await axios.get(url, config);
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível obter a lista de pedidos");
        }
        throw err;
    }
}

export const getOrderById = async (id: number) => {
    const token = await getToken();
    const url = Environment.BASE_URL + `/Order/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.get<IOrderReadModel>(url, config);
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível obter os dados do pedido");
        }
        throw err;
    }
}

export const postOrderCreate = async (data: IOrderCreateModel) => {
    const token = await getToken();
    const url = Environment.BASE_URL + "/Order";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.post(url, data, config);
        //Toast.showSuccessMessage(`Pedido adicionado com sucesso! Número do Pedido: ${result.data}`);
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível cadastrar o pedido");
        }
        throw err;
    }
}

export const putOrderEdit = async (id: number, data: IOrderUpdateModel) => {
    const token = await getToken();
    const url = Environment.BASE_URL + `/Order/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put<IOrderReadModel>(url, data, config);
        //Toast.showSuccessMessage("Pedido atualizado com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível atualizar o pedido");
        }
        throw err;
    }
}

export const postOrderFinish = async (id: number, data: IFinalizeOrderRequestModel) => {
    const token = await getToken();
    const url = Environment.BASE_URL + `/Order/${id}/finish`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.post(url, data, config);
        //Toast.showSuccessMessage("Pedido finalizado com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível finalizar o pedido");
        }
        throw err;
    }
}

export const deleteOrderById = async (id: number) => {
    const token = await getToken();
    let url = Environment.BASE_URL + `/Order/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.delete(url, config);
        //Toast.showSuccessMessage("Pedido excluído com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível excluir o pedido");
        }
        throw err;
    }
}