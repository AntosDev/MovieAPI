import { Movie } from '../domain/movie';
import { IMovieRepository } from '../domain/movie.repository';

export class MoviesRepositoryMock implements IMovieRepository {
  movies: Movie[] = [];
  save = jest.fn((movie: Movie): Promise<void> => {
    console.log('============= it is beign called');
    this.movies.push(movie);
    return Promise.resolve();
  });

  find = jest.fn((userId: string): Promise<Movie[]> => {
    const result = this.movies.filter((m) => m.userId == userId);
    return Promise.resolve(result);
  });
}
