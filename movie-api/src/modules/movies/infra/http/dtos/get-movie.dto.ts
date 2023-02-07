
export class MoviesDTO {
    public constructor(
        public id: string,
      public title: string,
      public released: string,
      public genre: string,
      public director: string,
      public userId: string,
    ) {
    }
}
