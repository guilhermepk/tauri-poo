import { PRODUCT_PRICE_PRECISION, PRODUCT_PRICE_SCALE } from "src/common/constants";
import { EntityTemplate } from "src/common/models/classes/entity.template";
import { OrdersEntity } from "src/orders/models/entities/orders.entity";
import { PurchasesOrdersEntity } from "src/purchases-orders/models/entities/purchases-orders.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'purchases' })
export class PurchasesEntity extends EntityTemplate {
    constructor(paidValue: number, changeAmount: number, orders: OrdersEntity[]){
        super();
        this.paidValue = paidValue;
        this.changeAmount = changeAmount;
    }

    @Column({ name: 'paid-value', type: 'numeric', precision: PRODUCT_PRICE_PRECISION, scale: PRODUCT_PRICE_SCALE, nullable: false })
    paidValue: number;

    @Column({ name: 'change-amount', type: 'numeric', precision: PRODUCT_PRICE_PRECISION, scale: PRODUCT_PRICE_SCALE, nullable: false })
    changeAmount: number;

    // --{ RELAÇÕES }--

    @OneToMany(() => PurchasesOrdersEntity, purchaseOrder => purchaseOrder.purchase)
    purchasesOrders: PurchasesOrdersEntity[];
}