import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,
    BeforeInsert, BeforeUpdate, ManyToOne
} from "typeorm";
import bcrypt from "bcryptjs";
import { User } from "./User";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    title!: string;

    @Column({ unique: true })
    description!: string;

    @Column()
    status!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    deliveryDate: Date;

    @ManyToOne(() => User, user => user.tasks)
    user!: User;
    

    constructor(title: string, description: string, status: string, deliveryDate: Date) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.deliveryDate = deliveryDate;

    }
}
