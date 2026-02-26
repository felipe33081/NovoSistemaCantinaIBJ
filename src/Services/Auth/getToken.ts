export const getToken = async () => {
    try {
        return Promise.resolve(localStorage.getItem('token') || '');
    } catch (error) {
        return Promise.reject(error);
    }
};