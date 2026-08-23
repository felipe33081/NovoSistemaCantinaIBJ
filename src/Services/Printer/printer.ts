import axios from 'axios';
import { Environment } from '../../environments/Index';
import { getToken } from '../Auth/getToken';
import { Toast } from '../../utils/ToastUtils';
import { handleApiError } from '../../utils/handleApiError';

const authConfig = async () => ({
    headers: { Authorization: `Bearer ${await getToken()}` }
});

// Lista as impressoras instaladas no Windows.
export const getPrinters = async (): Promise<string[]> => {
    const url = Environment.BASE_URL + '/printer/list';
    try {
        const result = await axios.get<string[]>(url, await authConfig());
        return result.data ?? [];
    } catch (err: any) {
        handleApiError(err);
        return [];
    }
};

// Retorna a impressora atualmente selecionada (ou null).
export const getPrinterSettings = async (): Promise<string | null> => {
    const url = Environment.BASE_URL + '/printer/settings';
    try {
        const result = await axios.get<{ printerName: string | null }>(url, await authConfig());
        return result.data?.printerName ?? null;
    } catch (err: any) {
        handleApiError(err);
        return null;
    }
};

// Salva a impressora selecionada.
export const savePrinterSettings = async (printerName: string | null): Promise<void> => {
    const url = Environment.BASE_URL + '/printer/settings';
    try {
        await axios.post(url, { printerName }, await authConfig());
        Toast.success('Impressora salva com sucesso.');
    } catch (err: any) {
        handleApiError(err);
    }
};

// Dispara um cupom de teste na impressora selecionada.
export const testPrint = async (): Promise<void> => {
    const url = Environment.BASE_URL + '/printer/test';
    try {
        await axios.post(url, null, await authConfig());
        Toast.success('Teste enviado para a impressora.');
    } catch (err: any) {
        handleApiError(err);
    }
};
