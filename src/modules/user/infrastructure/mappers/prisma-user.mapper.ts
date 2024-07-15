import { User as RawUser } from '@prisma/client';
import { User } from '../../domain/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      imgSrc: user.imgSrc,
      genre: user.genre,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        genre: raw.genre,
        imgSrc: raw.imgSrc,
      },
      raw.id,
    );
  }
}
