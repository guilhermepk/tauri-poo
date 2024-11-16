import { EntityTemplate } from "src/common/models/classes/entity.template";
import { OrdersEntity } from "src/orders/models/entities/orders.entity";
import { PurchasesEntity } from "src/purchases/models/entities/purchases.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'purchases-orders' })
export class PurchasesOrdersEntity extends EntityTemplate {
    constructor(purchase: PurchasesEntity, order: OrdersEntity){
        super();
        this.purchase = purchase;
        this.order = order;
    }

    @JoinColumn({ name: 'fk_order' })
    @ManyToOne(() => OrdersEntity, order => order.purchasesOrders, { nullable: false })
    order: OrdersEntity;

    @JoinColumn({ name: 'fk_purchase' })
    @ManyToOne(() => PurchasesEntity, purchase => purchase.purchasesOrders, { nullable: false })
    purchase: PurchasesEntity;
}