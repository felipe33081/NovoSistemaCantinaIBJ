export const renderDate = (date: string | Date) => {
    return date && new Date(date).toLocaleDateString("pt-BR");
};