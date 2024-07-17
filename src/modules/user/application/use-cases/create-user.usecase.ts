import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { EmailAlreadyExistsException } from '../../domain/exceptions/email-already-exists.exception';
import { PasswordNotMatchException } from '../../domain/exceptions/password-not-match.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new PasswordNotMatchException('Passwords do not match');
    }

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
