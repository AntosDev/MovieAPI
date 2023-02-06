import { v4 as uuidv4 } from 'uuid';
export class Movie {
  public id: string;
  constructor(
    public title: string,
    public released: string,
    public genre: string,
    public director: string,
  ) {
    this.id = uuidv4();
  }
}
