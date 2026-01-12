import axios from 'axios';
import { pickBy } from 'lodash';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import { Toast } from '../../utils/ToastUtils';
import {
    IFinalizeOrderRequestModel,
    IGetOrderListAsync,
    IOrderCreateModel,
    IOrderReadModel,
    IOrderUpdateModel
} from '../../utils/interfaces/interfaces';
import { handleApiError } from '../../utils/handleApiError';

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
        handleApiError(err);
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
        handleApiError(err);
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
        Toast.success(`Pedido adicionado com sucesso! Número do Pedido: ${result.data}`);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
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
        Toast.success("Pedido atualizado com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
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
        Toast.success("Pedido finalizado com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
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
        Toast.success("Pedido excluído com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}