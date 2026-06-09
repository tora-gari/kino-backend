import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Города')
@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) { }

    @Post()
    create(@Body() dto: CreateCityDto) {
        return this.citiesService.create(dto);
    }

    @Get()
    async findAll() {
        return this.citiesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.citiesService.findOne(id);
    }


}
