import { v4 as uuidv4 } from 'uuid';
export class Movie {
  public id: string;
  private constructor(
    public title: string,
    public released: string,
    public genre: string,
    public director: string,
    public userId: string,
  ) {
    this.id = uuidv4();
  }

  static CreateMovie(
    title: string,
    released: string,
    genre: string,
    director: string,
    user: { username: string; userId: string; userRole: string },
    userMovieCount: number,
  ): Movie {
    if (user.userRole == 'basic' && userMovieCount >= 5) {
      throw Error('limit reached');
    }
    return new Movie(title, released, genre, director, user.userId);
  }
}
