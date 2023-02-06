import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { dirname, join } from 'path';
import { MovieEntity } from './src/modules/movies/infra/data-access/Entities/movie.entity';
import { GenreEntity as GenreEntity } from './src/modules/movies/infra/data-access/Entities/genre.entity';
import { DirectorEntity } from './src/modules/movies/infra/data-access/Entities/director.entity';
import { UserEntity } from './src/modules/usersauth/infra/data-access/entities/user.entities';
import { Seed0000000000001 } from './src/migrations/initialseed';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? ''),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [MovieEntity, GenreEntity, DirectorEntity, UserEntity],
  migrations: [Seed0000000000001],
  migrationsTableName: 'migrations',
});
