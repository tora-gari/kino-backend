import { Hall } from "src/halls/entities/hall.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    row: number;

    @Column()
    number: number;

    @ManyToOne(() => Hall, (hall) => hall.seats)
    hall: Hall;

    @OneToMany(() => Ticket, (tickets) => tickets.seat)
    tickets: Ticket[];
}
