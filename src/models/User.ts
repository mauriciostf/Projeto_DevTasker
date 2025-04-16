import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,
    BeforeInsert, BeforeUpdate
} from "typeorm";
import bcrypt from "bcryptjs";
import { Task } from "./Task";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    constructor(name: string, email: string, password: string, createdAt: Date, tasks: []) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.tasks = tasks

    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}