export class Movie {
  constructor(
    public title: string,
    public released: Date,
    public genre: string,
    public director: string,
  ) {}

  static CreateMovie(
    title: string,
    released: Date,
    genre: string,
    director: string,
  ) {
    return new Movie(title, released, genre, director);
  }
}
