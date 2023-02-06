import { Inject } from '@nestjs/common';
import { Movie } from '../domain/movie';
import { IMovieRepository } from '../domain/movie.repository';

export class GetMoviesUseCase {
  constructor(
    @Inject(IMovieRepository) private readonly repository: IMovieRepository,
  ) {}
  async execute(request: { userId: string }): Promise<Movie[]> {
    console.log(
      '🚀 ~ file: get-movies.usecase.ts:10 ~ GetMoviesUseCase ~ execute ~ request',
      request,
    );
    return await this.repository.find(request.userId);
  }
}
