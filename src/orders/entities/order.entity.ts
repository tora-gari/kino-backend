import { Ticket } from "src/tickets/entities/ticket.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalPrice: number;

    @OneToMany(() => Ticket, (ticket) => ticket.order, { cascade: true })
    tickets: Ticket[];

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}
