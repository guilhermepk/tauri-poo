import { Injectable } from "@nestjs/common";
import { PurchasesTypeOrmRepository } from "./purchases.repository";
import { CreatePurchaseDto } from "./models/dtos/create-purchase.dto";
import { tryCatch } from "src/common/functions/try-catch.function";
import { OrdersService } from "src/orders/orders.service";
import { PurchasesEntity } from "./models/entities/purchases.entity";
import { PurchasesOrdersService } from "src/purchases-orders/purchases-orders.service";

@Injectable()
export class PurchasesService {
    constructor(
        private readonly typeOrmRepository: PurchasesTypeOrmRepository,
        private readonly ordersService: OrdersService,
        private readonly purchasesOrderService: PurchasesOrdersService
    ){}

    async create(dto: CreatePurchaseDto): Promise<PurchasesEntity> {
        return await tryCatch(async () => {
            const orders = await Promise.all(dto.orders.map(async (createOrderDto) => {
                return await this.ordersService.create(createOrderDto);
            }));
            
            const purchase = new PurchasesEntity(dto.paidValue, dto.changeAmount, orders);
            const savedPurchase = await this.typeOrmRepository.save(purchase);

            await Promise.all(orders.map(async order => {
                await this.purchasesOrderService.create(savedPurchase, order);
            }));

            return savedPurchase;
        }, `Erro ao registrar compra`);
    }
}