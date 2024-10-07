import { Controller, Get, Post, Query } from '@nestjs/common';
import { PopulateCitiesUseCase } from '../../application/use-cases/populate-cities.usecase';
import { GetAllCitiesUseCase } from '../../application/use-cases/get-all-cities.usecase';
import { SearchCitiesUseCase } from '../../application/use-cases/search-cities.usecase';

@Controller('cities')
export class CityController {
  constructor(
    private getAllCitiesUseCase: GetAllCitiesUseCase,
    private populateCitiesUseCase: PopulateCitiesUseCase,
    private searchCitiesUseCase: SearchCitiesUseCase,
  ) {}

  @Get()
  async getAllCities() {
    return await this.getAllCitiesUseCase.execute();
  }

  @Get('search')
  async searchCities(@Query('term') searchTerm: string) {
    return await this.searchCitiesUseCase.execute(searchTerm);
  }

  @Post('populate')
  async populateCities() {
    return await this.populateCitiesUseCase.execute();
  }
}
