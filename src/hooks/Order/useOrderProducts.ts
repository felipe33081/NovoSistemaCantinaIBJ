import { useState } from 'react';

export const useOrderProducts = (initialProducts: any[] = []) => {
    const [productsData, setProductsData] = useState<any[]>(initialProducts);

    const addProduct = (newItem: any) => {
        const existingItemIndex = productsData.findIndex(p => p.productId === newItem.productId);

        if (existingItemIndex >= 0) {
            const updatedList = [...productsData];
            const currentQty = Number(updatedList[existingItemIndex].quantity);
            const addedQty = Number(newItem.quantity);

            updatedList[existingItemIndex].quantity = (currentQty + addedQty).toString();
            setProductsData(updatedList);
        } else {
            setProductsData([...productsData, newItem]);
        }
    };

    const removeProduct = (productId: string | number) => {
        setProductsData(productsData.filter(item => item.productId !== productId));
    };

    return {
        productsData,
        setProductsData,
        addProduct,
        removeProduct
    };
};