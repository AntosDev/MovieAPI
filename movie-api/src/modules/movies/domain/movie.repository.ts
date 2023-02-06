import { Movie } from './movie';

export interface IMovieRepository {
  save(movie: Movie): void;
  find(userId: string): Promise<Movie[]>;
}
export const IMovieRepository = Symbol('IMovieRepository');
