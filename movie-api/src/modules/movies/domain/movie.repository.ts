import { Movie } from "./movie";

export interface IMovieRepository{
    save(movie: Movie): void;
    find(title: string): Movie;
    find(id: string): Movie;
}
export const IMovieRepository = Symbol('IMovieRepository');