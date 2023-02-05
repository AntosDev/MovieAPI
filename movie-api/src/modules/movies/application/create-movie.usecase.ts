import { Inject } from '@nestjs/common';
import { Movie } from '../domain/movie';
import { IMovieRepository } from '../domain/movie.repository';
import { IOnlineMoviesProvider } from './providers/onlineMovies.provider.interface';

export class CreateMovieUseCase {
  constructor(
    @Inject(IOnlineMoviesProvider)
    private readonly movieProvidfer: IOnlineMoviesProvider,
    @Inject(IMovieRepository) private readonly repository: IMovieRepository,
  ) {}
  async execute(request: { title: string }) {
    const movieData = await this.movieProvidfer.searchByTitle(request.title);
    console.log(
      '🚀 ~ file: create-movie.usecase.ts:8 ~ CreateMovieUseCase ~ execute ~ movieData',
      movieData,
    );

    const movie = Movie.CreateMovie(
      movieData.title,
      movieData.released,
      movieData.genre,
      movieData.director,
    );

    this.repository.save(movie);
  }
}
