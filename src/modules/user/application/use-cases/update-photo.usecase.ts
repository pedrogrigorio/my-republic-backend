import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdatePhotoUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(filename: string, userId: number): Promise<UserResponseDto> {
    const imgUrl = 'http://localhost:3000/pictures/' + filename;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    user.imgSrc = imgUrl;

    const updatedUser = await this.userRepository.update(user);

    return UserMapper.toDto(updatedUser);
  }
}
