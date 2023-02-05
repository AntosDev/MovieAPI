import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IOnlineMoviesProvider } from 'src/modules/movies/application/providers/onlineMovies.provider.interface';
type omdResponse = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
};
@Injectable()
export class OnlineMoviesProvider implements IOnlineMoviesProvider {
  constructor(private readonly httpService: HttpService) {}

  async searchByTitle(title: string): Promise<omdResponse> {
    console.log(
      '🚀 ~ file: onlinemovies.provider.ts:10 ~ OnlineMoviesProvider ~ searchByTitle ~ title',
      title,
    );
    const response = await firstValueFrom(
      this.httpService.get<omdResponse>(
        `https://www.omdbapi.com/?t=${title}&apikey=acc94964`,
      ),
    );
    return response.data as omdResponse;
  }
}
