import { useCallback } from "react";
import { putUserEdit } from "../../Services/User/user";

interface UseSubmitUserFormProps {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

export function useSubmitUserForm({
    id,
    name,
    email,
    phoneNumber,
    emailVerified,
    onSuccess,
    onClose,
}: UseSubmitUserFormProps) {
    const handleSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();
            const user = { name, email, phoneNumber, emailVerified };
            await putUserEdit(id ?? "", user);
            onSuccess();
            onClose();
        },
        [id, name, email, phoneNumber, emailVerified, onSuccess, onClose]
    );

    return { handleSubmit };
}