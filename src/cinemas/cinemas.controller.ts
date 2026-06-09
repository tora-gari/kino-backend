import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Кинотеатры')
@Controller('cinemas')
export class CinemasController {
    constructor(private readonly cinemasService: CinemasService) { }

    @Post()
    async create(@Body() dto: CreateCinemaDto) {
        return this.cinemasService.create(dto);
    }

    @Get()
    async findAll() {
        return this.cinemasService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.cinemasService.findOne(id);
    }

}
