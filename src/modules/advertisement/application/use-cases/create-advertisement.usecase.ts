import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { CreateAdvertisementDto } from '../dtos/create-advertisement.dto';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { Advertisement } from '../../domain/entities/advertisement';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAdvertisementUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(
    createAdvertisementDto: CreateAdvertisementDto,
  ): Promise<AdvertisementResponseDto> {
    const advertisement = new Advertisement(createAdvertisementDto);

    const createdAdvertisement =
      await this.advertisementRepository.create(advertisement);

    return AdvertisementMapper.toDto(createdAdvertisement);
  }
}
