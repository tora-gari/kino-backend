import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) { }
  async create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create({
      title: createMovieDto.title,
      description: createMovieDto.description,
      releaseDate: createMovieDto.releaseDate,
      duration: createMovieDto.duration,
    })
    await this.movieRepository.save(movie)
    return movie
  }

  async findAll() {
    return await this.movieRepository.find()
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } })

    if (!movie) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`)
    };

    return movie
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    await this.movieRepository.update(id, updateMovieDto)

    return await this.findOne(id);
  }

  async remove(id: number) {
    const movieDelete = await this.movieRepository.delete(id)

    if (movieDelete.affected === 0) {
      throw new NotFoundException(`Не удалось удалить фильм с ID ${id}`)
    };

    return `Фильм с ID ${id} успешно удален`;
  }
}
