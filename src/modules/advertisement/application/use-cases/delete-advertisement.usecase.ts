import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAdvertisementUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(advertisementId: number): Promise<void> {
    const advertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!advertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    await this.advertisementRepository.deleteById(advertisement.id);
  }
}
