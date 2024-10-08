import { AdvertisementSearchResultDto } from '../dtos/advertisement-search-result.dto';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { AdvertisementMapper } from '../mappers/advertisement.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchAdvertisementsByCityUseCase {
  constructor(private advertisementRepository: AdvertisementRepository) {}

  async execute(
    cityId: number,
    page: number = 1,
    pageSize: number = 12,
  ): Promise<AdvertisementSearchResultDto> {
    const searchResult = await this.advertisementRepository.findByCity(
      cityId,
      page,
      pageSize,
    );

    return {
      total: searchResult.total,
      advertisements: searchResult.advertisements.map((ad) =>
        AdvertisementMapper.toDto(ad),
      ),
    };
  }
}
