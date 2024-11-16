import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PurchasesOrdersEntity } from "./models/entities/purchases-orders.entity";
import { Repository } from "typeorm";

@Injectable()
export class PurchasesOrdersTypeOrmRepository {
    constructor(
        @InjectRepository(PurchasesOrdersEntity)
        private readonly repository: Repository<PurchasesOrdersEntity>
    ){}

    async save(purchaseOrder: PurchasesOrdersEntity){
        return await this.repository.save(purchaseOrder);
    }
}