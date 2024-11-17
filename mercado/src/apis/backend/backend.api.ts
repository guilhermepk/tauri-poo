import axios from "axios";
import { Product } from "./types/product.type";
import { ProductListItem } from "../../common/types/product-list-item";

const backendApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export async function getProductById(id: number): Promise<Product> {
    return await backendApi.get(`products/id=${id}`).then(response => response.data);
}

export async function createPurchase(
    productList: ProductListItem[],
    changeAmount: number,
    paidValue: number
){
    return await backendApi.post(
        'purchases/create',
        {
            paidValue,
            changeAmount,
            orders: productList.map(productItem => {
                return {
                    productId: productItem.product.id,
                    quantity: productItem.quantity
                }
            })
        }
    ).then(response => response.data);
}