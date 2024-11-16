import { Body, Controller, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./models/dtos/create-order.dto";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly service: OrdersService
    ){}

    @Post('create')
    async create(
        @Body() body: CreateOrderDto
    ){
        return await this.service.create(body);
    }
}