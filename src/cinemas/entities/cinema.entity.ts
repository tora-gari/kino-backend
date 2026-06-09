import { Session } from "src/sessions/entities/session.entity";
import { City } from "src/cities/entities/city.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hall } from "src/halls/entities/hall.entity";


@Entity('cinemas')
export class Cinema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => City, (city) => city.cinemas, { onDelete: 'CASCADE' })
    city: City;

    @OneToMany(() => Session, (session) => session.cinema, { onDelete: 'CASCADE' })
    sessions: Session[];

    @OneToMany(() => Hall, (hall) => hall.cinema, { onDelete: 'CASCADE' })
    halls: Hall[]
}