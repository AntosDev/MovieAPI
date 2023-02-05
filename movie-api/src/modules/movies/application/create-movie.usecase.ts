import { Inject } from "@nestjs/common";
import { IOnlineMoviesProvider } from "./providers/onlineMovies.provider.interface";

export class CreateMovieUseCase{
    constructor( @Inject(IOnlineMoviesProvider) private readonly movieProvidfer: IOnlineMoviesProvider){}
    async execute(request: {title: string}){
        const movieData = await this.movieProvidfer.searchByTitle(request.title);
        console.log("🚀 ~ file: create-movie.usecase.ts:8 ~ CreateMovieUseCase ~ execute ~ movieData", movieData)
        
    }
}