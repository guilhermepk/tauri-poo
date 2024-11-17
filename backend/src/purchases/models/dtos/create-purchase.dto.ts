import { Type } from "class-transformer";
import { ArrayMinSize, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { CreateOrderDto } from "src/orders/models/dtos/create-order.dto";

export class CreatePurchaseDto {
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDto)
    @ArrayMinSize(1)
    orders: CreateOrderDto[];

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    paidValue: number;

    @IsNotEmpty()
    @IsNumber()
    changeAmount: number;
}