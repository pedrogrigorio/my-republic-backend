import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { EmailAlreadyExistsException } from '../../domain/exceptions/email-already-exists.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    const user = UserMapper.fromCreateUserDto(createUserDto);

    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException(
        `The email ${user.email} already exists.`,
      );
    }

    await this.userRepository.create(user);
  }
}
