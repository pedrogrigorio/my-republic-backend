import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserRepository } from '../interfaces/user.repository.interface';
import { StorageService } from '../../../../core/services/storage/storage.service.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private storageService: StorageService,
  ) {}

  async execute(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} not found`);
    }

    if (user.imgSrc) {
      await this.storageService.deleteFile(user.imgSrc);
    }

    await this.userRepository.deleteById(user.id);
  }
}
