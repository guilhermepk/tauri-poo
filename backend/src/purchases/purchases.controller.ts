import { Body, Controller, Post } from "@nestjs/common";
import { PurchasesService } from "./purchases.service";
import { CreatePurchaseDto } from "./models/dtos/create-purchase.dto";

@Controller('purchases')
export class PurchasesController {
    constructor(
        private readonly service: PurchasesService
    ){}

    @Post('create')
    async create(
        @Body() body: CreatePurchaseDto
    ){
        const purchase = await this.service.create(body);
        return { message: `Compra ${purchase.id} registrada com sucesso` }
    }
}