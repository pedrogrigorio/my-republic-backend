import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { CreateAdvertisementDto } from '../dtos/create-advertisement.dto';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { AmenityRepository } from '../interfaces/amenity.repository.interface';
import { RuleRepository } from '../interfaces/rule.repository.interface';
import { Advertisement } from '../../domain/entities/advertisement';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAdvertisementUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private amenityRepository: AmenityRepository,
    private ruleRepository: RuleRepository,
  ) {}

  async execute(
    createAdvertisementDto: CreateAdvertisementDto,
  ): Promise<AdvertisementResponseDto> {
    const ruleTags = Object.keys(createAdvertisementDto.rules).filter(
      (rule) => createAdvertisementDto.rules[rule],
    );

    const amenityTags = Object.keys(createAdvertisementDto.amenities).filter(
      (amenity) => createAdvertisementDto.amenities[amenity],
    );

    console.log(ruleTags);
    console.log(amenityTags);

    const rules = await this.ruleRepository.findManyByTags(ruleTags);
    console.log(rules);

    const amenities = await this.amenityRepository.findManyByTags(amenityTags);
    console.log(amenities);

    const advertisement = new Advertisement({
      ...createAdvertisementDto,
      amenities,
      rules,
    });

    const createdAdvertisement =
      await this.advertisementRepository.create(advertisement);

    return AdvertisementMapper.toDto(createdAdvertisement);
  }
}
