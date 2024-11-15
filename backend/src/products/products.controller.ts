import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller(`products`)
export class ProductsController {
    constructor(
        private readonly service: ProductsService
    ){}

    @Get(`id=:id`)
    async findById(
        @Param('id') id: string
    ){
        return await this.service.findById(+id);
    }
}