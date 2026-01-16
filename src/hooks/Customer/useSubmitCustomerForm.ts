import { useCallback } from "react";
import { putCustomerEdit } from "../../Services/Customer/customer";
import { ICustomerPersonUpdateModel, IUseSubmitCustomerFormProps } from "../../utils/interfaces/interfaces";

export function useSubmitCustomerForm({
    id,
    name,
    phoneNumber,
    balance,
    onSuccess,
    onClose,
}: IUseSubmitCustomerFormProps) {
    const handleSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();

            try {
                const customer: ICustomerPersonUpdateModel = {
                    name,
                    phone: phoneNumber,
                    email: null,
                    balance
                };
                await putCustomerEdit(id ?? "", customer);
                onSuccess();
                onClose();
            } catch (error) {
                console.error("Erro na atualização do cliente:", error);
            }
        },
        [id, name, phoneNumber, balance, onSuccess, onClose]
    );

    return { handleSubmit };
}