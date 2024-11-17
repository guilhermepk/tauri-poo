import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsEntity } from "./models/entities/products.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsTypeOrmRepository } from "./repository/products.repository";
import { ProductsSeeder } from "./repository/products.seeder";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsEntity])
    ],
    controllers: [
        ProductsController
    ],
    providers: [
        ProductsService,
        ProductsTypeOrmRepository,
        ProductsSeeder
    ],
    exports: [
        ProductsService
    ]
})
export class ProductsModule implements OnModuleInit {
    constructor(
        private readonly seeder: ProductsSeeder
    ){}

    async onModuleInit() {
        await this.seeder.seed();
    }
}