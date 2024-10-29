import { SearchAdvertisementsByCityUseCase } from './application/use-cases/search-advertisements-by-city';
import { GetAdvertisementsByOwnerUseCase } from './application/use-cases/get-advertisements-by-owner.usecase';
import { PrismaAdvertisementRepository } from './infratructure/repositories/prisma-advertisement-repository';
import { GetAdvertisementByIdUseCase } from './application/use-cases/get-advertisement-by-id.usecase';
import { GetAllAdvertisementsUseCase } from './application/use-cases/get-all-advertisements.usecase';
import { UpdateAdvertisementUseCase } from './application/use-cases/update-advertisement.usecase';
import { CreateAdvertisementUseCase } from './application/use-cases/create-advertisement.usecase';
import { DeleteAdvertisementUseCase } from './application/use-cases/delete-advertisement.usecase';
import { AdvertisementRepository } from './application/interfaces/advertisement.repository.interface';
import { AdvertisementController } from './presentation/controllers/advertisement.controller';
import { PrismaAmenityRepository } from './infratructure/repositories/prisma-amenity-repository';
import { PrismaStateRepository } from './infratructure/repositories/prisma-state-repository';
import { PopulateCitiesUseCase } from './application/use-cases/populate-cities.usecase';
import { PopulateStatesUseCase } from './application/use-cases/populate-states.usecase';
import { PrismaCityRepository } from './infratructure/repositories/prisma-city-repository';
import { PrismaRuleRepository } from './infratructure/repositories/prisma-rule-repository';
import { GetAllCitiesUseCase } from './application/use-cases/get-all-cities.usecase';
import { GetAllStatesUseCase } from './application/use-cases/get-all-states.usecase';
import { SearchCitiesUseCase } from './application/use-cases/search-cities.usecase';
import { LocalStorageService } from '@src/core/services/storage/local-storage.service';
import { IBGELocaleService } from './infratructure/services/ibge-locale.service';
import { AmenityRepository } from './application/interfaces/amenity.repository.interface';
import { StateController } from './presentation/controllers/state.controller';
import { StateRepository } from './application/interfaces/state.repository.interface';
import { RuleRepository } from './application/interfaces/rule.repository.interface';
import { StorageService } from '@src/core/services/storage/storage.service.interface';
import { CityRepository } from './application/interfaces/city.repository.interface';
import { CityController } from './presentation/controllers/city.controller';
import { LocaleService } from './application/interfaces/locale.service.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetCitiesByStateIdUseCase } from './application/use-cases/get-cities-by-state-id.usecase';
import { PauseAdvertisementUseCase } from './application/use-cases/pause-advertisement.usecase';

@Module({
  imports: [HttpModule],
  controllers: [AdvertisementController, StateController, CityController],
  providers: [
    SearchAdvertisementsByCityUseCase,
    GetAdvertisementsByOwnerUseCase,
    GetAllAdvertisementsUseCase,
    GetAdvertisementByIdUseCase,
    DeleteAdvertisementUseCase,
    CreateAdvertisementUseCase,
    UpdateAdvertisementUseCase,
    PauseAdvertisementUseCase,
    GetCitiesByStateIdUseCase,
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
      provide: AmenityRepository,
      useClass: PrismaAmenityRepository,
    },
    {
      provide: RuleRepository,
      useClass: PrismaRuleRepository,
    },
    {
      provide: LocaleService,
      useClass: IBGELocaleService,
    },
    {
      provide: StorageService,
      useClass: LocalStorageService,
    },
  ],
})
export class AdvertisementModule {}
