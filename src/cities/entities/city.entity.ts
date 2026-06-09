import { Cinema } from "src/cinemas/entities/cinema.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @OneToMany(() => Cinema, (cinema) => cinema.city)
    cinemas: Cinema[];
}