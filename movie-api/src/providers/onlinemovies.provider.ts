import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OnlineMoviesProvider /*implements IOnlineMoviesProvider*/ {
  constructor(private readonly httpService: HttpService) {}

  async searchByTitle(title: string) {
    return await this.httpService.get(`https://www.omdbapi.com/?t=${title}&apikey=acc94964`);
  }
}
