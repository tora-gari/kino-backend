import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { CinemasModule } from 'src/cinemas/cinemas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    MoviesModule,
    CinemasModule
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule { }
