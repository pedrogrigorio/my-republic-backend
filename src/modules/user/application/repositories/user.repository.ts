import { User } from '../../domain/entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
