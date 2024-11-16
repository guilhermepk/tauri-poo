import { Injectable } from "@nestjs/common";
import { PurchasesOrdersTypeOrmRepository } from "./purchases-orders.repository";
import { PurchasesEntity } from "src/purchases/models/entities/purchases.entity";
import { OrdersEntity } from "src/orders/models/entities/orders.entity";
import { tryCatch } from "src/common/functions/try-catch.function";
import { PurchasesOrdersEntity } from "./models/entities/purchases-orders.entity";

@Injectable()
export class PurchasesOrdersService {
    constructor(
        private readonly typeOrmRepository: PurchasesOrdersTypeOrmRepository
    ){}

    async create(purchase: PurchasesEntity, order: OrdersEntity): Promise<PurchasesOrdersEntity> {
        return await tryCatch(async () => {
            const purchaseOrder = new PurchasesOrdersEntity(purchase, order);
            return await this.typeOrmRepository.save(purchaseOrder);
        }, `Erro ao criar relação entre compra ${purchase.id} e pedido ${order.id}`);
    }
}