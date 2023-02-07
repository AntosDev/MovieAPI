import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateMovieUseCase } from '../../application/create-movie.usecase';
import { CreateMovieRequestDto } from './dtos/create-movie-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetMoviesUseCase } from '../../application/get-movies.usecase';
import { MoviesDTO } from './dtos/get-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(
    // private readonly getMovieUseCase: GetMovieUseCase,
    private readonly getMoviesUseCase: GetMoviesUseCase,
    private readonly createMovieUseCase: CreateMovieUseCase, // private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Req() req, @Body() createMovieDto: CreateMovieRequestDto) {
    return await this.createMovieUseCase.execute({
      title: createMovieDto.title,
      user: req.user,
    }). catch((error) => new Error(error));;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req): Promise<MoviesDTO[] | Error> {
    return await this.getMoviesUseCase
      .execute({ userId: req.user.userId })
      .then((movies) =>
        movies.map(
          (movie) =>
            new MoviesDTO(
              movie.id,
              movie.title,
              movie.released,
              movie.genre,
              movie.director,
              movie.userId,
            ),
        ),
      ). catch((error) => new Error(error));
  }
}
