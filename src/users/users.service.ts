import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    async findByPhoneNumber(phoneNumber: string) {
        return this.userRepository.findOne({ where: { phoneNumber } })
    }

    async create(phoneNumber: string) {
        return this.userRepository.save({ phoneNumber })
    }
}
