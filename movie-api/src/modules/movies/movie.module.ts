import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineMoviesProvider } from 'src/external-providers/onlinemovies.provider';
import { CreateMovieUseCase } from './application/create-movie.usecase';
import { IOnlineMoviesProvider } from './application/providers/onlineMovies.provider.interface';
import { IMovieRepository } from './domain/movie.repository';
import { MovieEntity } from './infra/data-access/Entities/movie.entity';
import { MoviesRepository } from './infra/data-access/repositories/moviesrepository';
import { MovieController } from './infra/http/movie.controller';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [
    CreateMovieUseCase,
    {
      provide: IOnlineMoviesProvider,
      useClass: OnlineMoviesProvider, // can add condition on ENV, inject mock impl for unit testing
    },
    {
      provide: IMovieRepository,
      useClass: MoviesRepository, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class MovieModule {}
