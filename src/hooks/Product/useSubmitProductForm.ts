import { useCallback } from "react";
import { IProductUpdateModel, IUseSubmitProductFormProps } from "../../utils/interfaces/interfaces";
import { putProductEdit } from "../../Services/Product/product";

export function useSubmitProductForm({
    id,
    name,
    description,
    price,
    quantity,
    onSuccess,
    onClose,
}: IUseSubmitProductFormProps) {
    const handleSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();
            const product: IProductUpdateModel = {
                name,
                description,
                price,
                quantity
            };
            await putProductEdit(id ?? "", product);
            onSuccess();
            onClose();
        },

        [id, name, description, price, quantity, onSuccess, onClose]
    );

    return { handleSubmit };
}