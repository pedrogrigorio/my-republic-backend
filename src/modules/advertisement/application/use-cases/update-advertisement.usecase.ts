import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { UpdateAdvertisementDto } from '../dtos/update-advertisement.dto';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { AmenityRepository } from '../interfaces/amenity.repository.interface';
import { RuleRepository } from '../interfaces/rule.repository.interface';
import { StorageService } from '@src/core/services/storage/storage.service.interface';
import { Advertisement } from '../../domain/entities/advertisement';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private amenityRepository: AmenityRepository,
    private ruleRepository: RuleRepository,
    private storageService: StorageService,
  ) {}

  async execute(
    file: Express.Multer.File,
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

    const ruleTags = Object.keys(updateAdvertisementDto.rules).filter(
      (rule) => updateAdvertisementDto.rules[rule],
    );

    const amenityTags = Object.keys(updateAdvertisementDto.amenities).filter(
      (amenity) => updateAdvertisementDto.amenities[amenity],
    );

    const rules = await this.ruleRepository.findManyByTags(ruleTags);
    const amenities = await this.amenityRepository.findManyByTags(amenityTags);

    if (existingAdvertisement.imgSrc) {
      await this.storageService.deleteFile(existingAdvertisement.imgSrc);
    }

    const imgSrc = await this.storageService.upload(file);

    const advertisement = new Advertisement(
      {
        ...updateAdvertisementDto,
        rules,
        amenities,
        imgSrc,
      },
      advertisementId,
    );

    const updatedAdvertisement =
      await this.advertisementRepository.update(advertisement);

    return AdvertisementMapper.toDto(updatedAdvertisement);
  }
}
