import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OnlineMoviesProvider } from 'src/providers/onlinemovies.provider';
import { CreateMovieUseCase } from './application/create-movie.usecase';
import { IOnlineMoviesProvider } from './application/providers/onlineMovies.provider.interface';
import { MovieController } from './infra/http/movie.controller';

@Module({
  imports:[HttpModule],
  controllers: [MovieController],
  providers: [CreateMovieUseCase,  {
    provide: IOnlineMoviesProvider,
    useClass: OnlineMoviesProvider, // can add condition on ENV, inject mock impl for unit testing
  }],  
})
export class MovieModule {}
