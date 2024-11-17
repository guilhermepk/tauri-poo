import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersEntity } from "./models/entities/orders.entity";
import { OrdersTypeOrmRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";
import { ProductsModule } from "src/products/products.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrdersEntity]),
        ProductsModule
    ],
    providers: [
        OrdersTypeOrmRepository,
        OrdersService
    ],
    exports: [
        OrdersService
    ]
})
export class OrdersModule {}