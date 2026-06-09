import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from './entities/cinema.entity';
import { Repository } from 'typeorm';
import { CreateCinemaDto } from './dto/create-cinema.dto';

@Injectable()
export class CinemasService {
    constructor(
        @InjectRepository(Cinema)
        private readonly cinemaRepository: Repository<Cinema>,
    ) { }

    async create(dto: CreateCinemaDto) {
        const cinema = this.cinemaRepository.create({
            name: dto.name,
            city: { id: dto.cityId }
        });

        await this.cinemaRepository.save(cinema);

        return cinema;
    }

    async findAll() {
        return this.cinemaRepository.find({ relations: ['city'] });
    }

    async findOne(id: number) {
        return this.cinemaRepository.findOne({ where: { id }, relations: ['city'] })
    }


} 
