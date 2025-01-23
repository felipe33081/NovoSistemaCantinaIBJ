import { fetchAuthSession } from "aws-amplify/auth";

export const getToken = async () => {
    try {
        const session = await fetchAuthSession();
        return Promise.resolve(session.tokens?.accessToken.toString());
    } catch (error) {
        return Promise.reject(error);
    }
};