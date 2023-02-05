export interface IOnlineMoviesProvider{
    searchByTitle(title: string);
}
export const IOnlineMoviesProvider = Symbol('IOnlineMoviesProvider');