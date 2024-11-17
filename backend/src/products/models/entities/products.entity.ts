import { PRODUCT_PRICE_PRECISION, PRODUCT_PRICE_SCALE } from "src/common/constants";
import { EntityTemplate } from "src/common/models/classes/entity.template";
import { OrdersEntity } from "src/orders/models/entities/orders.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: `products` })
export class ProductsEntity extends EntityTemplate {
    constructor(name: string, price: number, description?: string){
        super();
        this.name = name;
        this.price = price;
        this.description = description ?? null;
    }

    @Column({ type: `varchar`, nullable: false })
    name: string;

    @Column({ type: `varchar`, nullable: true })
    description?: string;

    @Column({ type: 'numeric', nullable: false, precision: PRODUCT_PRICE_PRECISION, scale: PRODUCT_PRICE_SCALE })
    price: number;

    // --{ RELAÇÕES }--
    @OneToMany(() => OrdersEntity, order => order.product)
    orders: OrdersEntity[];
}