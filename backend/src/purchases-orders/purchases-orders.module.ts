import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchasesOrdersEntity } from "./models/entities/purchases-orders.entity";
import { PurchasesOrdersService } from "./purchases-orders.service";
import { PurchasesOrdersTypeOrmRepository } from "./purchases-orders.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([PurchasesOrdersEntity])
    ],
    providers: [
        PurchasesOrdersService,
        PurchasesOrdersTypeOrmRepository
    ],
    exports: [
        PurchasesOrdersService
    ]
})
export class PurchasesOrdersModule {}