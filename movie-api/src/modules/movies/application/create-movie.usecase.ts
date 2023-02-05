import { Inject } from "@nestjs/common";
import { IOnlineMoviesProvider } from "./providers/onlineMovies.provider.interface";

export class CreateMovieUseCase{
    constructor( @Inject(IOnlineMoviesProvider) private readonly movieProvidfer: IOnlineMoviesProvider){}
    execute(request: {title: string}){
        this.movieProvidfer.searchByTitle(request.title);
    }
}