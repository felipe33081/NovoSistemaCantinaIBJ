import { useCallback } from "react";
import { putUserEdit } from "../../Services/User/user";
import { IUseSubmitUserFormProps } from "../../utils/interfaces/interfaces";

export function useSubmitUserForm({
    id,
    name,
    email,
    phoneNumber,
    emailVerified,
    onSuccess,
    onClose,
}: IUseSubmitUserFormProps) {
    const handleSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();
            try {
                const user = { name, email, phoneNumber, emailVerified };
                await putUserEdit(id ?? "", user);
                onSuccess();
                onClose();
            } catch (error) {
                console.error('Erro ao editar usuário:', error);
            }
        },
        [id, name, email, phoneNumber, emailVerified, onSuccess, onClose]
    );

    return { handleSubmit };
}