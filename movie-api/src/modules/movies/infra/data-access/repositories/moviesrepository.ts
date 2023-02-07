import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/modules/movies/domain/movie';
import { IMovieRepository } from 'src/modules/movies/domain/movie.repository';
import { Repository } from 'typeorm';
import { MovieEntity } from '../Entities/movie.entity';
@Injectable()
export class MoviesRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly repo: Repository<MovieEntity>,
  ) {}
  async save(movie: Movie): Promise<void> {
    console.log(
      '🚀 ~ file: moviesrepository.ts:8 ~ MoviesRepository ~ save ~ movie',
      movie,
    );
    await this.repo.save({
      title: movie.title,
      id: movie.id,
      createdBy: movie.userId,
      // createdDate: new Date(),
    });
  }

  find(userId: string): Promise<Movie[]> {
    console.log(
      '🚀 ~ file: moviesrepository.ts:27 ~ MoviesRepository ~ find ~ userId',
      userId,
    );
    return this.repo
      .find({
        // relations: ['genre', 'director'],
        where: {
          createdBy: userId,
        },
      })
      .then((dbmovies) =>
        dbmovies.map(
          (dbMovie): Movie => ({
            title: dbMovie.title,
            id: dbMovie.id,
            released: dbMovie.releaseddate.toISOString(),
            director: dbMovie.director?.name,
            genre: dbMovie.genre?.name,
            userId: dbMovie.createdBy,
          }),
        ),
      );
  }
}
