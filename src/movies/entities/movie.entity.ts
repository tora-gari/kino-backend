import { Session } from "src/sessions/entities/session.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    releaseDate: Date

    @Column()
    duration: number

    @OneToMany(() => Session, (session) => session.movie)
    sessions: Session[]
}