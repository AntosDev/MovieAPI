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
  async execute(request: {
    title: string;
    user: { userId: string; username: string; role: string };
  }) {
    const movieData = await this.movieProvidfer.searchByTitle(request.title);
    const userMovies = await this.repository.find(request.user.userId);
    const movie = Movie.CreateMovie(
      movieData.Title,
      movieData.Released,
      movieData.Genre,
      movieData.Director,
      {
        username: request.user.username,
        userId: request.user.userId,
        userRole: request.user.role,
      },
      userMovies.length,
    );
    this.repository.save(movie);
  }
}
