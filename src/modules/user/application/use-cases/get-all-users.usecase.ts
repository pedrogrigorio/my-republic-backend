import { UserRepository } from '../repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();

    const usersDto = users.map((user) => UserMapper.toDto(user));

    return usersDto;
  }
}
