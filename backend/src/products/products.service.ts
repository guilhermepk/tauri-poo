import { Injectable, NotFoundException } from "@nestjs/common";
import { tryCatch } from "src/common/functions/try-catch.function";
import { ProductsTypeOrmRepository } from "./repository/products.repository";

@Injectable()
export class ProductsService {
    constructor(
        private readonly typeOrmRepository: ProductsTypeOrmRepository
    ){}

    async findById(id: number){
        return await tryCatch(async () => {
            const product = await this.typeOrmRepository.findById(id);
            if (!product) throw new NotFoundException(`Produto ${id} não encontrado`);
            return product;
        }, `Erro ao buscar produto ${id}`);
    }
}