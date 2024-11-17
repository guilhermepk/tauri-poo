import { Injectable } from "@nestjs/common";
import { ProductsTypeOrmRepository } from "./products.repository";
import { ProductsEntity } from "../models/entities/products.entity";

@Injectable()
export class ProductsSeeder {
    constructor(
        private readonly typeOrmRepository: ProductsTypeOrmRepository
    ){}

    async seed(){
        const productsCount = await this.typeOrmRepository.count();

        if(productsCount < 1){
            const products: ProductsEntity[] = [
                new ProductsEntity('Banana', 5),
                new ProductsEntity('Abacate', 5.99, 'Verde'),
                new ProductsEntity('Leite', 6.77, 'Zero Lactose, 1L'),
                new ProductsEntity('Arroz São João', 8, '1Kg'),
            ];
    
            await Promise.all(products.map(async (product) => {
                await this.typeOrmRepository.save(product);
            }));
        }
    }
}