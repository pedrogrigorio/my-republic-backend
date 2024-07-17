export class InvalidGenreException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidGenreException';
  }
}
