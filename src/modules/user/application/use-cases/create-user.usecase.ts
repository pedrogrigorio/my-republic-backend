import { EmailAlreadyExistsException } from '../../domain/exceptions/email-already-exists.exception';
import { PasswordNotMatchException } from '../../domain/exceptions/password-not-match.exception';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
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

    const createdUser = await this.userRepository.create(user);

    return UserMapper.toDto(createdUser);
  }
}
