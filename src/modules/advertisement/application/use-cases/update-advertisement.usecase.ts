import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { UpdateAdvertisementDto } from '../dtos/update-advertisement.dto';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { Advertisement } from '../../domain/entities/advertisement';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAdvertisementUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(
    updateAdvertisementDto: UpdateAdvertisementDto,
    advertisementId: number,
  ): Promise<AdvertisementResponseDto> {
    const existingAdvertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!existingAdvertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    const advertisement = new Advertisement(
      updateAdvertisementDto,
      advertisementId,
    );

    console.log(advertisement);

    const updatedAdvertisement =
      await this.advertisementRepository.update(advertisement);

    console.log(updatedAdvertisement);

    return AdvertisementMapper.toDto(updatedAdvertisement);
  }
}
