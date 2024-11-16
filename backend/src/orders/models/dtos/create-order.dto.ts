import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    productId: number;

    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    quantity: number;
}