import { Injectable } from "@nestjs/common";
import { OrdersTypeOrmRepository } from "./orders.repository";
import { CreateOrderDto } from "./models/dtos/create-order.dto";
import { tryCatch } from "src/common/functions/try-catch.function";
import { ProductsService } from "src/products/products.service";
import { ProductsEntity } from "src/products/models/entities/products.entity";
import { OrdersEntity } from "./models/entities/orders.entity";

@Injectable()
export class OrdersService {
    constructor(
        private readonly typeOrmRepository: OrdersTypeOrmRepository,
        private readonly productService: ProductsService
    ){}

    async create(dto: CreateOrderDto): Promise<OrdersEntity> {
        return await tryCatch(async () => {
            const product: ProductsEntity = await this.productService.findById(dto.productId);

            const order = new OrdersEntity(product, dto.quantity);
            return await this.typeOrmRepository.save(order);
        }, `Erro ao criar pedido para o produto ${dto.productId}`);
    }
}