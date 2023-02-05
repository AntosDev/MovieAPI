import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './healthcheck/app.controller';
import { AppService } from './healthcheck/app.service';
import { IOnlineMoviesProvider } from './modules/movies/application/providers/onlineMovies.provider.interface';
import { MovieModule } from './modules/movies/movie.module';
import { OnlineMoviesProvider } from './providers/onlinemovies.provider';

@Module({
  imports: [MovieModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
