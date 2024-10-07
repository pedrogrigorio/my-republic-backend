import { Module } from '@nestjs/common';
import { AdvertisementRepository } from './application/interfaces/advertisement.repository.interface';
import { AdvertisementController } from './presentation/controllers/advertisement.controller';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { CreateAdvertisementUseCase } from './application/use-cases/create-advertisement.usecase';
import { DeleteAdvertisementUseCase } from './application/use-cases/delete-advertisement.usecase';
import { GetAdvertisementByIdUseCase } from './application/use-cases/get-advertisement-by-id.usecase';
import { GetAllAdvertisementsUseCase } from './application/use-cases/get-all-advertisements.usecase';
import { UpdateAdvertisementUseCase } from './application/use-cases/update-advertisement.usecase';
import { CityRepository } from './application/interfaces/city.repository.interface';
import { PrismaAdvertisementRepository } from './infratructure/repositories/prisma-advertisement-repository';
import { PrismaCityRepository } from './infratructure/repositories/prisma-city-repository';
import { PrismaStateRepository } from './infratructure/repositories/prisma-state-repository';
import { StateRepository } from './application/interfaces/state.repository.interface';
import { GetAllCitiesUseCase } from './application/use-cases/get-all-cities.usecase';
import { GetAllStatesUseCase } from './application/use-cases/get-all-states.usecase';
import { StateController } from './presentation/controllers/state.controller';
import { CityController } from './presentation/controllers/city.controller';
import { HttpModule } from '@nestjs/axios';
import { LocaleService } from './application/interfaces/locale.service.interface';
import { IBGELocaleService } from './infratructure/services/ibge-locale.service';
import { PopulateCitiesUseCase } from './application/use-cases/populate-cities.usecase';
import { PopulateStatesUseCase } from './application/use-cases/populate-states.usecase';
import { SearchCitiesUseCase } from './application/use-cases/search-cities.usecase';

@Module({
  imports: [HttpModule],
  controllers: [AdvertisementController, StateController, CityController],
  providers: [
    GetAllAdvertisementsUseCase,
    GetAdvertisementByIdUseCase,
    DeleteAdvertisementUseCase,
    CreateAdvertisementUseCase,
    UpdateAdvertisementUseCase,
    PopulateCitiesUseCase,
    PopulateStatesUseCase,
    SearchCitiesUseCase,
    GetAllCitiesUseCase,
    GetAllStatesUseCase,
    PrismaService,
    {
      provide: AdvertisementRepository,
      useClass: PrismaAdvertisementRepository,
    },
    {
      provide: CityRepository,
      useClass: PrismaCityRepository,
    },
    {
      provide: StateRepository,
      useClass: PrismaStateRepository,
    },
    {
      provide: LocaleService,
      useClass: IBGELocaleService,
    },
  ],
})
export class AdvertisementModule {}
