import { PrimaryGeneratedColumn } from "typeorm";

export abstract class TemplateEntity {
    @PrimaryGeneratedColumn()
    id: number;
}