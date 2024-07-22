import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserRepository } from '../interfaces/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class GetUserByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundException(`User with email ${email} not found`);
    }

    return UserMapper.toDto(user);
  }
}
