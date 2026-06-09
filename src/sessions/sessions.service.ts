import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { CinemasService } from 'src/cinemas/cinemas.service';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly moviesService: MoviesService,
    private readonly cinemasService: CinemasService
  ) { }

  async create(createSessionDto: CreateSessionDto) {
    await this.moviesService.findOne(createSessionDto.movieId)

    await this.cinemasService.findOne(createSessionDto.hallId)

    const session = this.sessionRepository.create({
      startTime: createSessionDto.startTime,
      price: createSessionDto.price,
      movie: { id: createSessionDto.movieId },
      hall: { id: createSessionDto.hallId }
    })

    return await this.sessionRepository.save(session)
  }

  async findAll() {
    return await this.sessionRepository.find({ relations: ['movie', 'cinema'] })
  }

  async findOne(id: number) {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['movie', 'cinema'],
    });

    if (!session) {
      throw new NotFoundException(`Сеанс с ID ${id} не найден`);
    }

    return session

  }

  async getSessionsSeats(id: number) {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['hall', 'hall.seats', 'tickets', 'tickets.seat'],
    });

    if(!session) {
      throw new NotFoundException(`Сеанс с ID ${id} не найден`);
    }

    const bookedSeatIds = session.tickets.map(ticket => ticket.seat.id);

    return session.hall.seats.map(seat => ({
      id: seat.id,
      row: seat.row,
      number: seat.number,
      isBooked: bookedSeatIds.includes(seat.id),
    }))
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    await this.sessionRepository.update(id, updateSessionDto)

    return await this.findOne(id);
  }

  async remove(id: number) {
    const sessionDelete = await this.sessionRepository.delete(id)

    if (sessionDelete.affected === 0) {
      throw new NotFoundException(`Не удалось удалить сеанс с ID ${id}`)
    };

    return `Сеанс с ID ${id} успешно удален `;
  }
}
