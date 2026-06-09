import { Session } from "src/sessions/entities/session.entity";
import { Cinema } from "src/cinemas/entities/cinema.entity";
import { Seat } from "src/seats/entities/seat.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hall {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Cinema, (cinema) => cinema.halls)
    cinema: Cinema;

    @OneToMany(() => Seat, (seat) => seat.hall, { onDelete: 'CASCADE' })
    seats: Seat[];

    @OneToMany(() => Session, (session) => session.hall, { onDelete: 'CASCADE' })
    sessions: Session[];

}
