import { Product } from "../../apis/backend/types/product.type";

export type ProductListItem = {
    product: Product;
    quantity: number;
    total: number;
}