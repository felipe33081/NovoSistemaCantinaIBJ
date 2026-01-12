// Variável local para guardar as funções
let toastRef: {
    showSuccess: (msg: string) => void;
    showError: (msg: string) => void;
    showInfo: (msg: string) => void;
    showWarning: (msg: string) => void;
} | null = null;

// Função que o Contexto vai chamar para "ligar" o sistema
export const setToastRef = (ref: typeof toastRef) => {
    toastRef = ref;
};

// O objeto que você vai usar nos seus Services (axios, etc)
export const Toast = {
    success: (msg: string) => toastRef?.showSuccess(msg),
    error: (msg: string) => toastRef?.showError(msg),
    info: (msg: string) => toastRef?.showInfo(msg),
    warning: (msg: string) => toastRef?.showWarning(msg),
};