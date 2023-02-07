import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../../../domain/movie';
import { IMovieRepository } from '../../../domain/movie.repository.interface';
import { Repository } from 'typeorm';
import { DirectorEntity } from '../Entities/director.entity';
import { GenreEntity } from '../Entities/genre.entity';
import { MovieEntity } from '../Entities/movie.entity';
@Injectable()
export class MoviesRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly repo: Repository<MovieEntity>,
    @InjectRepository(GenreEntity)
    private readonly repoGenre: Repository<GenreEntity>,
    @InjectRepository(DirectorEntity)
    private readonly repoDirector: Repository<DirectorEntity>,
  ) {}
  async save(movie: Movie): Promise<void> {
    let genre = await this.repoGenre.findOne({
      where: {
        name: movie.genre,
      },
    });
    if (!genre)
      genre = await this.repoGenre.save({
        name: movie.genre,
        createdBy: movie.userId,
      });

    let director = await this.repoDirector.findOne({
      where: {
        name: movie.director,
      },
    });
    if (!director)
      director = await this.repoDirector.save({
        name: movie.director,
        createdBy: movie.userId,
      });
    await this.repo.save({
      id: movie.id,
      title: movie.title,
      genre: { id: genre.id },
      director: { id: director.id },
      createdBy: movie.userId,
    });
  }

  find(userId: string): Promise<Movie[]> {
    return this.repo
      .find({
        relations: ['genre', 'director'],
        where: {
          createdBy: userId,
        },
      })
      .then((dbmovies) =>
        dbmovies.map(
          (dbMovie): Movie => ({
            title: dbMovie.title,
            id: dbMovie.id,
            released: dbMovie.releaseddate.toISOString(),
            director: dbMovie.director?.name,
            genre: dbMovie.genre?.name,
            userId: dbMovie.createdBy,
          }),
        ),
      );
  }
}
