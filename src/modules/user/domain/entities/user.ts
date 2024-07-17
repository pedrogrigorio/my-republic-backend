import { InvalidPasswordException } from '../exceptions/invalid-password.exception';
import { InvalidGenreException } from '../exceptions/invalid-genre.exception';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { Genre } from 'src/core/enums/genre';

interface UserProps {
  name: string;
  email: string;
  password: string;
  genre: Genre;
  imgSrc?: string;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(props: UserProps, id?: number) {
    this.validateGenre(props.genre);
    this.validateEmail(props.email);
    this.validatePassword(props.password);

    this._id = id;
    this.props = props;
  }

  private validateGenre(genre: Genre) {
    if (genre !== 0 && genre !== 1) {
      throw new InvalidGenreException('Invalid genre');
    }
  }

  private validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      throw new InvalidEmailException('Invalid email');
    }
  }

  private validatePassword(value: string) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!regex.test(value)) {
      throw new InvalidPasswordException('Invalid password');
    }
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.validateEmail(email);
    this.props.email = email;
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: string) {
    this.validatePassword(password);
    this.props.password = password;
  }

  public get imgSrc() {
    return this.props.imgSrc;
  }

  public set imgSrc(imgSrc: string) {
    this.props.imgSrc = imgSrc;
  }

  public get genre() {
    return this.props.genre;
  }

  public set genre(genre: Genre) {
    this.validateGenre(genre);
    this.props.genre = genre;
  }
}
