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
import { CreateMovieRequestDto } from './dtos/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetMoviesUseCase } from '../../application/get-movies.usecase';

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
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req) {
    return await this.getMoviesUseCase.execute({ userId: req.user.userId });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.getMovieUseCase.execute();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieRequestDto) {
  //   return this.updateMovieUseCase.execute();
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.createMovieUseCase.execute(createMovieDto);
  // }
}
