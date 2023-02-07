import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineMoviesProvider } from '../../external-providers/onlinemovies.provider';
import { CreateMovieUseCase } from './application/create-movie.usecase';
import { GetMoviesUseCase } from './application/get-movies.usecase';
import { IOnlineMoviesProvider } from './application/providers/onlineMovies.provider.interface';
import { IMovieRepository } from './domain/movie.repository';
import { DirectorEntity } from './infra/data-access/Entities/director.entity';
import { GenreEntity } from './infra/data-access/Entities/genre.entity';
import { MovieEntity } from './infra/data-access/Entities/movie.entity';
import { MoviesRepository } from './infra/data-access/repositories/moviesrepository';
import { MovieController } from './infra/http/movie.controller';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([MovieEntity]),
    TypeOrmModule.forFeature([GenreEntity]),
    TypeOrmModule.forFeature([DirectorEntity]),
  ],
  controllers: [MovieController],
  providers: [
    GetMoviesUseCase,
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
