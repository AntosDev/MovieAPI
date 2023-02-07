import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { IMovieRepository } from '../src/modules/movies/domain/movie.repository.interface';
import { MoviesRepositoryMock } from './../src/modules/movies/mocks/movies.repository.mock';
import { IUsersRepository } from '../src/modules/usersauth/domain/users.repository.interface';
import { UsersRepositoryMock } from './../src/modules/usersauth/mocks/user-repository.mock';

describe('MoviesControllere (e2e)', () => {
  let app: INestApplication;
  let moviesRepoMock: MoviesRepositoryMock;
  let usersRepoMock: UsersRepositoryMock;
  beforeEach(async () => {
    moviesRepoMock = new MoviesRepositoryMock();
    usersRepoMock = new UsersRepositoryMock();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IMovieRepository)
      .useValue(moviesRepoMock)
      .overrideProvider(IUsersRepository).useValue(usersRepoMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (post)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' });

    return await request(app.getHttpServer())
      .post('/movie')
      .send({
        title: 'the desolation of smaug',
      })
      .auth(response.body['token'], { type: 'bearer' })
      .expect(201);
  });

  it('/ (get)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'john', password: 'changeme' });

    await request(app.getHttpServer())
      .post('/movie')
      .send({
        title: 'The fellowship of the ring',
      })
      .auth(response.body['token'], { type: 'bearer' })
      .expect(201);

    return await request(app.getHttpServer())
      .get('/movie')
      .auth(response.body['token'], { type: 'bearer' })
      .expect(200);
  });
});
