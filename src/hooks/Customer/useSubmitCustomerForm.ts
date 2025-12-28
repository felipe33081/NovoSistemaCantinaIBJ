import { useCallback } from "react";
import { putCustomerEdit } from "../../Services/Customer/customer";
import { ICustomerPersonUpdateModel, UseSubmitCustomerFormProps } from "../../utils/interfaces/interfaces";

export function useSubmitCustomerForm({
    id,
    name,
    phoneNumber,
    balance,
    onSuccess,
    onClose,
}: UseSubmitCustomerFormProps) {
    const handleSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();
            const customer: ICustomerPersonUpdateModel = {
                name,
                phone: phoneNumber,
                email: null,
                balance
            };
            await putCustomerEdit(id ?? "", customer);
            onSuccess();
            onClose();
        },
        [id, name, phoneNumber, onSuccess, onClose]
    );

    return { handleSubmit };
}