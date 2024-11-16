import axios from "axios";
import { Product } from "./types/product.type";

const backendApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export async function getProductById(id: number): Promise<Product> {
    return await backendApi.get(`products/id=${id}`).then(response => response.data);
}