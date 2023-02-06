import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/modules/movies/domain/movie';
import { IMovieRepository } from 'src/modules/movies/domain/movie.repository';
import { Repository } from 'typeorm';
import { MovieEntity } from '../Entities/movie.entity';
@Injectable()
export class MoviesRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly repo: Repository<MovieEntity>,
  ) {}
  save(movie: Movie): void {
    console.log(
      '🚀 ~ file: moviesrepository.ts:8 ~ MoviesRepository ~ save ~ movie',
      movie,
    );
    this.repo.save({
      title: movie.title,
      id: movie.id,
      createdBy: 'test',
      // createdDate: new Date(),
    });
  }
  find(title: string): Movie;
  find(id: string): Movie;
  find(id: unknown): Movie {
    throw new Error('Method not implemented.');
  }
}
