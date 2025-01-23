import axios from 'axios';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import { IDashboardData, IGetDashboardDataModel } from '../../utils/interfaces/interfaces';

export const getDashboardData = async (params: IGetDashboardDataModel) => {
    const token = await getToken();
    const url = Environment.BASE_URL + "/Dashboard/Metrics";

    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params
    }

    try {
        const result = await axios.get<IDashboardData>(url, config);
        return result.data;
    }
    catch (err: any) {
        if (err?.response?.data?.errors) {
            //Toast.showErrorMessage(err.response.data.errors);
        } else {
            //Toast.showErrorMessage("Não foi possível obter os dados do dashboard");
        }
        throw err;
    }
}