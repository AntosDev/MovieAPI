import { Test, TestingModule } from '@nestjs/testing';
import { IMovieRepository } from '../domain/movie.repository.interface';
import { MoviesRepositoryMock } from '../mocks/movies.repository.mock';
import { GetMoviesUseCase } from './get-movies.usecase';

describe('GetMoviesUseCase', () => {
  let useCase: GetMoviesUseCase;
  let moviesRepoMock: MoviesRepositoryMock;

  beforeEach(async () => {
    moviesRepoMock = new MoviesRepositoryMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetMoviesUseCase,
        {
          provide: IMovieRepository,
          useValue: moviesRepoMock,
        },
      ],
    }).compile();

    useCase = module.get<GetMoviesUseCase>(GetMoviesUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('should only return the movies of the user', async () => {
    moviesRepoMock.save({
      title: 'TestMovie1',
      released: new Date().toISOString(),
      genre: 'genreOfTestMovie1',
      director: 'directorOfTestMovie1',
      userId: 'testuser1id',
      id: 'movie1Id',
    });
    moviesRepoMock.save({
      title: 'TestMovie2',
      released: new Date().toISOString(),
      genre: 'genreOfTestMovie2',
      director: 'directorOfTestMovie2',
      userId: 'testuser2id',
      id: 'movie2Id',
    });
    const movies = await useCase.execute({ userId: 'testuser2id' });
    expect(moviesRepoMock.find).toHaveBeenCalledTimes(1);
    expect(moviesRepoMock.find).toHaveBeenCalledWith('testuser2id');
    expect(movies).toHaveLength(1);
    expect(movies).toStrictEqual([
      {
        title: 'TestMovie2',
        released: expect.any(String),
        genre: 'genreOfTestMovie2',
        director: 'directorOfTestMovie2',
        userId: 'testuser2id',
        id: 'movie2Id',
      },
    ]);
  });
});
