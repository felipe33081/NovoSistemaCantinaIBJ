import axios from 'axios';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import {
    IGetUserListFilter,
    IGroupRequestModel,
    IUserGetResponseModel,
    IUserPostRequestModel,
    IUserPutRequestModel
} from '../../utils/interfaces/interfaces';

export const getUserList = async (props: IGetUserListFilter) => {
    const { size, page, email, name, paginationToken } = props;
    const token = await getToken();
    var url = Environment.BASE_URL + `/Users?size=${size}&page=${page}`;

    url = name ? url + `&filter=name^="${name}"` : url;
    url = email ? url + `&filter=email^="${email}"` : url;
    url = paginationToken ? url + `&paginationToken=${paginationToken}` : url;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const result = await axios.get(url, config);
        return result.data;
    }
    catch (error) {
        //Toast.showErrorMessage("Não foi possível obter a lista de usuários");
    }
}

export const getUserGroupsList = async (id: string) => {
    const token = await getToken();
    var url = Environment.BASE_URL + `/Users/${id}/Groups?page=0&size=10`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const result = await axios.get(url, config);
        return result.data;
    }
    catch (error) {
        //Toast.showErrorMessage("Não foi possível obter a lista de usuários");
    }
}

export const getUserById = async (id: string) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/Users/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.get<IUserGetResponseModel>(url, config);
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            // Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível obter os dados do usuário");
        }
        throw err;
    }
}

export const getUserByIdWithouPermission = async (id: string) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/Users/${id}/WithoutPermission`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.get<IUserGetResponseModel>(url, config);
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            // Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível obter os dados do usuário");
        }
        throw err;
    }
}

export const postUserCreate = async (data: IUserPostRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + "/Users";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.post(url, data, config);
        //Toast.showSuccessMessage("Usuário adicionado com sucesso!");
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível cadastrar um usuário");
        }
        throw err;
    }
}

export const putUserEdit = async (id: string, data: IUserPutRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/Users/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        //Toast.showSuccessMessage("Usuário atualizado com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível atualizar um usuário");
        }
        throw err;
    }
}

export const addUserGroupEdit = async (id: string, data: IGroupRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/Users/${id}/AddUserToGroup`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        //Toast.showSuccessMessage("Grupo adicionado ao usuário com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível adicionar um grupo ao usuário");
        }
        throw err;
    }
}

export const removeUserGroupEdit = async (id: string, data: IGroupRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/Users/${id}/RemoveUserToGroup`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        //Toast.showSuccessMessage("Grupo removido do usuário com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível remover grupo do usuário");
        }
        throw err;
    }
}

export const deleteUserById = async (id: string) => {

    let token = await getToken();
    let url = Environment.BASE_URL + `/Users/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.delete(url, config);
        //Toast.showSuccessMessage("Usuário excluído com sucesso!");
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível excluir o usuário");
        }
        throw err;
    }
}