import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsEntity } from "./models/entities/products.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsTypeOrmRepository } from "./products.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsEntity])
    ],
    controllers: [
        ProductsController
    ],
    providers: [
        ProductsService,
        ProductsTypeOrmRepository
    ],
    exports: [
        ProductsService
    ]
})
export class ProductsModule {}