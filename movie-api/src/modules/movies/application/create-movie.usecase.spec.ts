import { Test, TestingModule } from '@nestjs/testing';
import { IMovieRepository } from '../domain/movie.repository';
import { MoviesRepositoryMock } from '../mocks/movies.repository.mock';
import { OnlineMoviesProviderMock } from '../mocks/online-movies.provider.mock';
import { CreateMovieUseCase } from './create-movie.usecase';
import { IOnlineMoviesProvider } from './providers/onlineMovies.provider.interface';

describe('CreateMovieUseCase', () => {
  let useCase: CreateMovieUseCase;
  let onlineMoviesMock: OnlineMoviesProviderMock;
  let moviesRepoMock: MoviesRepositoryMock;

  beforeEach(async () => {
    onlineMoviesMock = new OnlineMoviesProviderMock();
    moviesRepoMock = new MoviesRepositoryMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMovieUseCase,
        {
          provide: IOnlineMoviesProvider,
          useValue: onlineMoviesMock,
        },
        {
          provide: IMovieRepository,
          useValue: moviesRepoMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateMovieUseCase>(CreateMovieUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
  it('should successfully add 1 movie for basic user', async () => {
    await useCase.execute({
      title: 'TestMovie',
      user: { userId: 'testuserid', username: 'testusername', role: 'basic' },
    });
    expect(onlineMoviesMock.searchByTitle).toHaveBeenCalled();
    expect(moviesRepoMock.find).toHaveBeenCalled();
    expect(moviesRepoMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'TestMovie',
        released: expect.any(String),
        genre: 'genreOfTestMovie',
        director: 'directorOfTestMovie',
        userId: 'testuserid',
        id: expect.any(String),
      }),
    );
  });
  it('should not successfully add 1 movie for basic user that already has 5', async () => {
    await useCase.execute({
      title: 'TestMovie1',
      user: { userId: 'testuserid', username: 'testusername', role: 'basic' },
    });
    await useCase.execute({
      title: 'TestMovie2',
      user: { userId: 'testuserid', username: 'testusername', role: 'basic' },
    });
    await useCase.execute({
      title: 'TestMovie3',
      user: { userId: 'testuserid', username: 'testusername', role: 'basic' },
    });
    await useCase.execute({
      title: 'TestMovie4',
      user: { userId: 'testuserid', username: 'testusername', role: 'basic' },
    });
    await useCase.execute({
      title: 'TestMovie5',
      user: { userId: 'testuserid', username: 'testusername', role: 'basic' },
    });
    await useCase
      .execute({
        title: 'TestMovie6',
        user: { userId: 'testuserid', username: 'testusername', role: 'basic' },
      })
      .catch((err) => console.log(err));
    expect(onlineMoviesMock.searchByTitle).toHaveBeenCalledTimes(6);
    expect(moviesRepoMock.find).toHaveBeenCalledTimes(6);
    expect(moviesRepoMock.save).toHaveBeenCalledTimes(5);
  });

  it('should successfully add 1 movie for premium user that already has 5', async () => {
    await useCase.execute({
      title: 'TestMovie1',
      user: { userId: 'testuserid', username: 'testusername', role: 'premium' },
    });
    await useCase.execute({
      title: 'TestMovie2',
      user: { userId: 'testuserid', username: 'testusername', role: 'premium' },
    });
    await useCase.execute({
      title: 'TestMovie3',
      user: { userId: 'testuserid', username: 'testusername', role: 'premium' },
    });
    await useCase.execute({
      title: 'TestMovie4',
      user: { userId: 'testuserid', username: 'testusername', role: 'premium' },
    });
    await useCase.execute({
      title: 'TestMovie5',
      user: { userId: 'testuserid', username: 'testusername', role: 'premium' },
    });
    await useCase.execute({
      title: 'TestMovie6',
      user: { userId: 'testuserid', username: 'testusername', role: 'premium' },
    });
    expect(onlineMoviesMock.searchByTitle).toHaveBeenCalledTimes(6);
    expect(moviesRepoMock.find).toHaveBeenCalledTimes(6);
    expect(moviesRepoMock.save).toHaveBeenCalledTimes(6);
  });
});
