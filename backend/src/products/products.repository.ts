import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductsEntity } from "./models/entities/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsTypeOrmRepository {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly repository: Repository<ProductsEntity>
    ){}

    async findById(id: number){
        return await this.repository.findOne({ where: { id } });
    }
}