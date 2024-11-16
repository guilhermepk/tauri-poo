import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PurchasesEntity } from "./models/entities/purchases.entity";
import { Repository } from "typeorm";

@Injectable()
export class PurchasesTypeOrmRepository {
    constructor(
        @InjectRepository(PurchasesEntity)
        private readonly repository: Repository<PurchasesEntity>
    ){}

    async save(purchase: PurchasesEntity){
        return await this.repository.save(purchase);
    }
}