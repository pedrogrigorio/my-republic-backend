import { UserRepository } from '../../application/interfaces/user.repository.interface';
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
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async create(user: User): Promise<User> {
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

    return userWithId;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((item) => item.id === user.id);

    this.users[index] = user;

    return user;
  }
}
