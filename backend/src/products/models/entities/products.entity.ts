import { TemplateEntity } from "src/common/models/classes/template.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: `products` })
export class ProductsEntity extends TemplateEntity {
    @Column({ type: `varchar`, nullable: false })
    name: string;

    @Column({ type: `varchar`, nullable: true })
    description?: string;

    @Column({ type: 'decimal', nullable: false, precision: 2 })
    price: number;
}