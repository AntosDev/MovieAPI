import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IOnlineMoviesProvider } from 'src/modules/movies/application/providers/onlineMovies.provider.interface';

@Injectable()
export class OnlineMoviesProvider implements IOnlineMoviesProvider {
  constructor(private readonly httpService: HttpService) {}

  async searchByTitle(title: string) {
    console.log("🚀 ~ file: onlinemovies.provider.ts:10 ~ OnlineMoviesProvider ~ searchByTitle ~ title", title)
    // return await this.httpService.get(`https://www.omdbapi.com/?t=${title}&apikey=acc94964`);
  }
}
