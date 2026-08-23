// Auth local (offline). O backend nao valida o token; ele existe apenas para
// manter o cabecalho Bearer usado pelos servicos. O valor vem do login por PIN.
export const getToken = async (): Promise<string> => {
    return localStorage.getItem('authToken') ?? '';
};
