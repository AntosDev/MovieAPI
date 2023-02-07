import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  IOnlineMoviesProvider,
  omdResponse,
} from 'src/modules/movies/application/providers/onlineMovies.provider.interface';

@Injectable()
export class OnlineMoviesProvider implements IOnlineMoviesProvider {
  constructor(private readonly httpService: HttpService) {}

  async searchByTitle(title: string): Promise<omdResponse> {
    const response = await firstValueFrom(
      this.httpService.get<omdResponse>(
        `https://www.omdbapi.com/?t=${title}&apikey=acc94964`,
      ),
    );
    return response.data as omdResponse;
  }
}
