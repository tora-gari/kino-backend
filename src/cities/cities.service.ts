import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,
    ) { }

    async create(dto: CreateCityDto) {
        const city = this.cityRepository.create(dto);

        await this.cityRepository.save(city);

        return city;
    }

    async findAll() {
        return this.cityRepository.find();
    }

    async findOne(id: number) {
        return this.cityRepository.findOne({ where: { id } });
    }


}
