import { EntityTemplate } from "src/common/models/classes/entity.template";
import { ProductsEntity } from "src/products/models/entities/products.entity";
import { PurchasesOrdersEntity } from "src/purchases-orders/models/entities/purchases-orders.entity";
import { PurchasesEntity } from "src/purchases/models/entities/purchases.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'orders' })
export class OrdersEntity extends EntityTemplate {
    constructor(product: ProductsEntity, quantity: number){
        super();
        this.product = product;
        this.quantity = quantity;
    }

    @Column({ type: 'integer', nullable: false })
    quantity: number;

    // --{ RELAÇÕES }--
    @JoinColumn({ name: `fk_product` })
    @ManyToOne(() => ProductsEntity, product => product.orders, { nullable: false })
    product: ProductsEntity;

    @OneToMany(() => PurchasesOrdersEntity, purchaseOrder => purchaseOrder.order)
    purchasesOrders: PurchasesOrdersEntity[];
}