import { Toast } from './ToastUtils';

export const handleApiError = (err: any, fallbackMessage?: string) => {
    if (err.response) {
        const status = err.response.status;
        const errorResponse = err.response.data;

        switch (status) {
            case 401:
                Toast.error("Sessão expirada. Faça login novamente.");
                throw err; 
            
            case 403:
                Toast.error("Você não tem permissão para realizar esta ação.");
                throw err;

            case 404:
                if (!errorResponse?.errors) {
                    Toast.error("Registro não encontrado.");
                    throw err;
                }
                break;
        }

        if (errorResponse?.errors) {
            if (typeof errorResponse.errors === 'string') {
                Toast.error(errorResponse.errors);
            } else if (typeof errorResponse.errors === 'object') {
                const firstErrorKey = Object.keys(errorResponse.errors)[0];
                const errorMessage = errorResponse.errors[firstErrorKey]?.[0];
                if (errorMessage) Toast.error(errorMessage);
            }
            throw err;
        }
    }

    const msg = fallbackMessage || "Ocorreu um erro inesperado. Tente novamente.";
    Toast.error(msg);
    
    throw err;
};