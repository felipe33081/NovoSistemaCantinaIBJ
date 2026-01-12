import { Toast } from './ToastUtils';

export const handleApiError = (err: any) => {
    const errorResponse = err.response?.data;

    if (errorResponse?.errors) {
        if (typeof errorResponse.errors === 'string') {
            Toast.error(errorResponse.errors);
        } else if (typeof errorResponse.errors === 'object') {
            const firstErrorKey = Object.keys(errorResponse.errors)[0];
            const errorMessage = errorResponse.errors[firstErrorKey]?.[0];
            if (errorMessage) Toast.error(errorMessage);
        }
    } else {
        Toast.error("Ocorreu um erro inesperado.");
    }
    
    throw err;
};