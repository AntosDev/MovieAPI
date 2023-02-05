import { Injectable } from '@nestjs/common';
import { Movie } from 'src/modules/movies/domain/movie';
import { IMovieRepository } from 'src/modules/movies/domain/movie.repository';

@Injectable()
export class MoviesRepository implements IMovieRepository {
  save(movie: Movie): void {
    console.log(
      '🚀 ~ file: moviesrepository.ts:8 ~ MoviesRepository ~ save ~ movie',
      movie,
    );
  }
  find(title: string): Movie;
  find(id: string): Movie;
  find(id: unknown): Movie {
    throw new Error('Method not implemented.');
  }
}
