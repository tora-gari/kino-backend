import { Cinema } from "src/cinemas/entities/cinema.entity";
import { Hall } from "src/halls/entities/hall.entity";
import { Movie } from "src/movies/entities/movie.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    startTime: Date

    @Column()
    price: number

    @ManyToOne(() => Movie, (movie) => movie.sessions, { onDelete: 'CASCADE' })
    movie: Movie

    @ManyToOne(() => Cinema, (cinema) => cinema.sessions, { onDelete: 'CASCADE' })
    cinema: Cinema

    @ManyToOne(() => Hall, (hall) => hall.sessions)
    hall: Hall;

    @OneToMany(() => Ticket, (ticket) => ticket.session)
    tickets: Ticket[];


}
