import { CityRepository } from '../interfaces/city.repository.interface';
import { LocaleService } from '../interfaces/locale.service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PopulateCitiesUseCase {
  constructor(
    private cityRepository: CityRepository,
    private localeService: LocaleService,
  ) {}

  async execute() {
    const cities = await this.localeService.getCities();
    const batchSize = 1000;

    for (let i = 0; i < cities.length; i += batchSize) {
      const batch = cities.slice(i, i + batchSize);
      await Promise.all(batch.map((city) => this.cityRepository.create(city)));
    }
  }
}
