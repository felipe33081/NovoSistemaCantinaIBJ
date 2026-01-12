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
            try {
                const product: IProductUpdateModel = {
                    name,
                    description,
                    price,
                    quantity
                };

                await putProductEdit(id ?? "", product);

                onSuccess();
                onClose();
            } catch (error) {
                console.error("Erro no submit do produto:", error);
            }
        },

        [id, name, description, price, quantity, onSuccess, onClose]
    );

    return { handleSubmit };
}