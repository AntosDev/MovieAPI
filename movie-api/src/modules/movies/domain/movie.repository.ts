import { Movie } from './movie';

export interface IMovieRepository {
  save(movie: Movie): Promise<void>;
  find(userId: string): Promise<Movie[]>;
}
export const IMovieRepository = Symbol('IMovieRepository');
