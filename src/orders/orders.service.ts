import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { DataSource } from 'typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Order } from './entities/order.entity';
import { Session } from 'src/sessions/entities/session.entity';

@Injectable()
export class OrdersService {
  constructor(private dataSource: DataSource) { }

  async createOrder(createOrderDto: CreateOrderDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      let totalPrice = 0;
      const tickets: Ticket[] = [];

      const session = await queryRunner.manager.findOne(Session, {
        where: { id: createOrderDto.sessionId },
        relations: ['hall']
      });

      if (!session) {
        throw new BadRequestException(`Сеанс с ID ${createOrderDto.sessionId} не найден`);
      }

      for (const seatId of createOrderDto.seatIds) {
        const seat = await queryRunner.manager.findOne(Seat, {
          where: { id: seatId },
          relations: ['hall'],
          lock: { mode: 'pessimistic_write' },
        });

        if (!seat) {
          throw new BadRequestException(`Место ${seatId} не найдено`);
        }

        if (seat.hall.id !== session.hall.id) {
          throw new BadRequestException(`Место ${seatId} не относится к залу сеанса`);
        }

        const existingTicket = await queryRunner.manager.findOne(Ticket, {
          where: { session: { id: createOrderDto.sessionId }, seat: { id: seatId } },
          lock: { mode: 'pessimistic_write' },
        });

        if (existingTicket) {
          throw new BadRequestException(`Место с ${seatId} уже занято!`);
        }

        const price = session.price;
        totalPrice += price;

        const newTicket = queryRunner.manager.create(Ticket, {
          session: { id: createOrderDto.sessionId },
          seat: { id: seatId },
          price: price,
        });

        tickets.push(newTicket);
      }

      const order = queryRunner.manager.create(Order, {
        totalPrice,
        tickets: tickets,
        user: { id: userId }
      });

      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUserOrders(userId: number) {
    const orders = await this.dataSource.getRepository(Order).find({
      where: { user: { id: userId } },
      relations: {
        tickets: {
          seat: true,
          session: {
            movie: true,
            cinema: true,
            hall: true
          }
        }
      },
      order: {
        id: 'DESC'
      }
    });

    return orders;
  }
}
