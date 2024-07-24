import { EmailAlreadyExistsException } from '../../domain/exceptions/email-already-exists.exception';
import { PasswordNotMatchException } from '../../domain/exceptions/password-not-match.exception';
import { UserRepository } from '../interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(signUpDto: SignUpDto): Promise<void> {
    if (signUpDto.password !== signUpDto.passwordConfirm) {
      throw new PasswordNotMatchException('Passwords do not match');
    }

    const user = UserMapper.fromSignUpDto(signUpDto);

    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new EmailAlreadyExistsException(
        `The email ${user.email} already exists.`,
      );
    }

    await this.userRepository.create(user);
  }
}
