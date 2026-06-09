import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import { Hall } from './entities/hall.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hall])],
  controllers: [HallsController],
  providers: [HallsService],
})
export class HallsModule { }
