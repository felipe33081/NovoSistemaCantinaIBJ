import axios from 'axios';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import { IDashboardData, IGetDashboardDataModel } from '../../utils/interfaces/interfaces';
import { Toast } from '../../utils/ToastUtils';
import { handleApiError } from '../../utils/handleApiError';

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
        handleApiError(err);
    }
}