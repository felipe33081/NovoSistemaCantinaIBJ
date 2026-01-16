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
import { Toast } from '../../utils/ToastUtils';
import { handleApiError } from '../../utils/handleApiError';

export const getUserList = async (props: IGetUserListFilter) => {
    const { size, page, email, name, paginationToken } = props;
    const token = await getToken();
    var url = Environment.BASE_URL + `/User?size=${size}&page=${page}`;

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
    catch (err: any) {
        handleApiError(err);
    }
}

export const getUserGroupsList = async (id: string) => {
    const token = await getToken();
    var url = Environment.BASE_URL + `/User/${id}/Groups?page=0&size=10`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const result = await axios.get(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const getUserById = async (id: string) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/User/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.get<IUserGetResponseModel>(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const getUserByIdWithouPermission = async (id: string) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/User/${id}/WithoutPermission`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.get<IUserGetResponseModel>(url, config);
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const postUserCreate = async (data: IUserPostRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + "/User";

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        const result = await axios.post(url, data, config);
        Toast.success("Usuário adicionado com sucesso!");
        return result.data;
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const putUserEdit = async (id: string, data: IUserPutRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/User/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        Toast.success("Usuário atualizado com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const addUserGroupEdit = async (id: string, data: IGroupRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/User/${id}/AddUserToGroup`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        Toast.success("Grupo adicionado ao usuário com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const removeUserGroupEdit = async (id: string, data: IGroupRequestModel) => {

    const token = await getToken();
    const url = Environment.BASE_URL + `/User/${id}/RemoveUserToGroup`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.put(url, data, config);
        Toast.success("Grupo removido do usuário com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}

export const deleteUserById = async (id: string) => {

    let token = await getToken();
    let url = Environment.BASE_URL + `/User/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    try {
        await axios.delete(url, config);
        Toast.success("Usuário excluído com sucesso!");
    }
    catch (err: any) {
        handleApiError(err);
    }
}