import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductsEntity } from "../models/entities/products.entity";

@Injectable()
export class ProductsTypeOrmRepository {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly repository: Repository<ProductsEntity>
    ){}

    async save(product: ProductsEntity): Promise<ProductsEntity> {
        return await this.repository.save(product);
    }

    async count(){
        return await this.repository.count();
    }

    async findById(id: number){
        return await this.repository.findOne({ where: { id } });
    }
}