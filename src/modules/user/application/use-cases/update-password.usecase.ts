import { PasswordNotMatchException } from '../../domain/exceptions/password-not-match.exception';
import { InvalidPasswordException } from '../../domain/exceptions/invalid-password.exception';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { updatePasswordDto } from '../dtos/update-password.dto';
import { UserRepository } from '../repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    updatePasswordDto: updatePasswordDto,
    userId: number,
  ): Promise<void> {
    const { oldPassword, newPassword, confirmNewPassword } = updatePasswordDto;

    if (newPassword !== confirmNewPassword) {
      throw new PasswordNotMatchException('Passwords do not match');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    if (user.password !== oldPassword) {
      throw new InvalidPasswordException('Old password is invalid');
    }

    user.password = newPassword;

    await this.userRepository.update(user);
  }
}
