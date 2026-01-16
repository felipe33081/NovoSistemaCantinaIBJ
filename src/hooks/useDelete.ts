import { useState } from 'react';
import { useToast } from '../components/ToastContext';
import { IUseDeleteProps } from '../utils/interfaces/interfaces';
import { handleApiError } from '../utils/handleApiError';

export const useDelete = ({
    apiDeleteFunction,
    onSuccess,
    successMessage = "Registro excluído com sucesso!",
}: IUseDeleteProps) => {

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const { showSuccess } = useToast();

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
    };

    const handleClose = () => {
        setDeleteId(null);
    };

    const handleConfirmDelete = async () => {
        if (deleteId === null) return;

        setLoading(true);
        try {
            await apiDeleteFunction(deleteId);
            showSuccess(successMessage);
            onSuccess();
            handleClose();
        } catch (error) {
            console.error(error);
            try {
                handleApiError(error);
            } catch {
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteId,
        loading,
        handleDeleteClick,
        handleConfirmDelete,
        handleClose
    };
};