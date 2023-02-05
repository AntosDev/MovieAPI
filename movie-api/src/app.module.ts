import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './healthcheck/app.controller';
import { AppService } from './healthcheck/app.service';
import { MovieModule } from './modules/movies/movie.module';
import { UsersAuthentication } from './modules/usersauth/userauths.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
      entities: ['src/**/*.entity{.ts,.js}'], // **\**\**\**\**\*.entity{.ts,.js}
      synchronize: true,
      migrationsTableName: 'migration',
      migrations: ['src/migrations/*.ts'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
