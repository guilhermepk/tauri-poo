import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasesEntity } from "./models/entities/purchases.entity";
import { PurchasesService } from "./purchases.service";
import { PurchasesTypeOrmRepository } from "./purchases.repository";
import { OrdersModule } from "src/orders/orders.module";
import { PurchasesController } from "./purchases.controller";
import { PurchasesOrdersModule } from "src/purchases-orders/purchases-orders.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PurchasesEntity]),
        OrdersModule,
        PurchasesOrdersModule
    ],
    controllers: [
        PurchasesController
    ],
    providers: [
        PurchasesService,
        PurchasesTypeOrmRepository
    ]
})
export class PurchasesModule {}