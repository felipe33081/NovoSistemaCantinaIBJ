import axios from 'axios';
import { Environment } from '../../environments/Index';

export interface LoginResult {
    token: string;
    isDefaultPin: boolean;
}

// Login local por PIN contra a API embutida (offline). Lanca em caso de PIN
// incorreto (HTTP 401), tratado pela tela de login.
export const loginWithPin = async (pin: string): Promise<LoginResult> => {
    const url = Environment.BASE_URL + '/auth/login';
    const result = await axios.post(url, { pin });
    return result.data as LoginResult;
};

// Troca o PIN de acesso. Exige o PIN atual.
export const changePin = async (currentPin: string, newPin: string): Promise<void> => {
    const url = Environment.BASE_URL + '/auth/change-pin';
    await axios.post(url, { currentPin, newPin });
};
