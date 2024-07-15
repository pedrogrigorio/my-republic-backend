import { UserRepository } from '../../application/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  constructor() {}

  public users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User> {
    const user = this.users.filter((user) => user.id === id)[0];
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.filter((user) => user.email === email)[0];
    return user;
  }

  async create(user: User): Promise<void> {
    const id = this.users.length;
    const userWithId = new User(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        genre: user.genre,
        imgSrc: user.imgSrc,
      },
      id,
    );

    this.users.push(userWithId);
    console.log(this.users);
  }
}
