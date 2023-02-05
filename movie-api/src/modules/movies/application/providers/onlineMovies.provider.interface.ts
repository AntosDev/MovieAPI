export type omdResponse = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
  Director: string;
};
export interface IOnlineMoviesProvider {
  searchByTitle(title: string): Promise<omdResponse>;
}
export const IOnlineMoviesProvider = Symbol('IOnlineMoviesProvider');
