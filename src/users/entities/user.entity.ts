import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: 'telegram_id', nullable: true })
    telegramId: string;

    @Column({ name: 'role', default: 'USER' })
    role: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}