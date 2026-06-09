import { Order } from "src/orders/entities/order.entity";
import { Seat } from "src/seats/entities/seat.entity";
import { Session } from "src/sessions/entities/session.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @ManyToOne(() => Session, (session) => session.tickets)
    session: Session;

    @ManyToOne(() => Seat, (seat) => seat.tickets)
    seat: Seat;

    @ManyToOne(() => Order, (order) => order.tickets)
    order: Order;
}