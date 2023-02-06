import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './healthcheck/app.controller';
import { AppService } from './healthcheck/app.service';
import { MovieModule } from './modules/movies/movie.module';
import { UsersAuthentication } from './modules/usersauth/userauths.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dirname, join } from 'path';
import { MovieEntity } from './modules/movies/infra/data-access/Entities/movie.entity';
import { Genre } from './modules/movies/infra/data-access/Entities/genre.entity';
import { Director } from './modules/movies/infra/data-access/Entities/director.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MovieModule,
    HttpModule,
    UsersAuthentication,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      entities: [MovieEntity, Genre, Director],
      migrations: ['src/migrations/**/*.{ts,js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
