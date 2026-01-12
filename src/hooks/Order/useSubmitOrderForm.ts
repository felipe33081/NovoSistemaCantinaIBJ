import React from "react";
import { IUseSubmitOrderFormProps, IOrderUpdateModel } from "../../utils/interfaces/interfaces";
import { putOrderEdit } from "../../Services/Order/order";

export const useSubmitOrderForm = ({
    id,
    customerName,
    customerPersonId,
    data,
    onSuccess,
    onClose
}: IUseSubmitOrderFormProps) => {

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const order: IOrderUpdateModel = {
                customerName: customerName,
                customerPersonId: customerPersonId,
                products: data.map((item) => ({
                    productId: item.id,
                    quantity: parseInt(item.quantity) || 0,
                })),
            };

            await putOrderEdit(id, order);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao processar pedido:", error);
        }
    };

    return { handleSubmit };
};