import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from '../Infrastructure/APIs/Movies/movie.controller';

@Module({
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
