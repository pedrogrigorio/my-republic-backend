import { Genre } from 'src/core/enums/genre';

interface UserProps {
  name: string;
  email: string;
  password: string;
  imgSrc: string;
  genre: Genre;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(props: UserProps, id?: number) {
    this._id = id;
    this.props = props;
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
    this.props.email = email;
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: string) {
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
    this.props.genre = genre;
  }
}
