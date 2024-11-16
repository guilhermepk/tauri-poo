import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "./models/entities/orders.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersTypeOrmRepository {
    constructor(
        @InjectRepository(OrdersEntity)
        private readonly repository: Repository<OrdersEntity>
    ){}

    async save(order: OrdersEntity){
        return this.repository.save(order);
    }
}