import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    await this.userRepository.deleteById(user.id);
  }
}
