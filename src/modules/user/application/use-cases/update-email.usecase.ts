import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserRepository } from '../repositories/user.repository';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserMapper } from '../mappers/user.mapper';
import { EmailAlreadyExistsException } from '../../domain/exceptions/email-already-exists.exception';

@Injectable()
export class UpdateEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    updateEmailDto: UpdateEmailDto,
    userId: number,
  ): Promise<UserResponseDto> {
    const { newEmail } = updateEmailDto;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    const existingUser = await this.userRepository.findByEmail(newEmail);

    if (existingUser) {
      throw new EmailAlreadyExistsException(
        `The email ${newEmail} already exists.`,
      );
    }

    user.email = newEmail;

    await this.userRepository.update(user);

    return UserMapper.toDto(user);
  }
}
