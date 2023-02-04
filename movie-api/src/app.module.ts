import { Module } from '@nestjs/common';
import { AppController } from './healthcheck/app.controller';
import { AppService } from './healthcheck/app.service';
import { MovieModule } from './modules/movies/movie.module';

@Module({
  imports: [MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
