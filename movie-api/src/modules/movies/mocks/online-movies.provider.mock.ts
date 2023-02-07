import { Injectable } from '@nestjs/common';
import {
  IOnlineMoviesProvider,
  omdResponse,
} from '../application/providers/onlineMovies.provider.interface';

@Injectable()
export class OnlineMoviesProviderMock implements IOnlineMoviesProvider {
  searchByTitle = jest.fn((title: string): Promise<omdResponse> => {
    var result: omdResponse = {
      Title: title,
      Genre: 'genreOf' + title,
      Director: 'directorOf' + title,
      Year: new Date().toISOString(),
      Rated: 'ratingOf' + title,
      Released: new Date().toISOString(),
    };
    return Promise.resolve(result);
  });
}
