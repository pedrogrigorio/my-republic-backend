import { Controller, Get, Post } from '@nestjs/common';
import { PopulateCitiesUseCase } from '../../application/use-cases/populate-cities.usecase';
import { GetAllCitiesUseCase } from '../../application/use-cases/get-all-cities.usecase';

@Controller('cities')
export class CityController {
  constructor(
    private getAllCitiesUseCase: GetAllCitiesUseCase,
    private populateCitiesUseCase: PopulateCitiesUseCase,
  ) {}

  @Get()
  async getAllCities() {
    return await this.getAllCitiesUseCase.execute();
  }

  @Post('populate')
  async populateCities() {
    return await this.populateCitiesUseCase.execute();
  }
}
