import { GetAllAdvertisementsUseCase } from '../../application/use-cases/get-all-advertisements.usecase';
import { GetAdvertisementByIdUseCase } from '../../application/use-cases/get-advertisement-by-id.usecase';
import { DeleteAdvertisementUseCase } from '../../application/use-cases/delete-advertisement.usecase';
import { UpdateAdvertisementUseCase } from '../../application/use-cases/update-advertisement.usecase';
import { CreateAdvertisementUseCase } from '../../application/use-cases/create-advertisement.usecase';
import { CreateAdvertisementDto } from '../../application/dtos/create-advertisement.dto';
import { UpdateAdvertisementDto } from '../../application/dtos/update-advertisement.dto';
import { isPublic } from '@src/core/decorators/is-public.decorator';
import {
  Controller,
  Delete,
  Param,
  Post,
  Body,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { SearchAdvertisementsByCityUseCase } from '../../application/use-cases/search-advertisements-by-city';

@Controller('advertisements')
export class AdvertisementController {
  constructor(
    private searchAdvertisementsByCityUseCase: SearchAdvertisementsByCityUseCase,
    private getAllAdvertisementsUseCase: GetAllAdvertisementsUseCase,
    private deleteAdvertisementUseCase: DeleteAdvertisementUseCase,
    private createAdvertisementUseCase: CreateAdvertisementUseCase,
    private updateAdvertisementUseCase: UpdateAdvertisementUseCase,
    private getAdvertisementById: GetAdvertisementByIdUseCase,
  ) {}

  @isPublic()
  @Get()
  async getAllAdvertisements() {
    return await this.getAllAdvertisementsUseCase.execute();
  }

  @isPublic()
  @Get('search-by-city')
  async searchAdvertisementsByCity(
    @Query('city') cityId: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const id = parseInt(cityId);
    const pageNumber = page ? parseInt(page) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize) : 12;

    return await this.searchAdvertisementsByCityUseCase.execute(
      id,
      pageNumber,
      pageSizeNumber,
    );
  }

  @isPublic()
  @Get(':id')
  async getAdvertisement(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    return await this.getAdvertisementById.execute(id);
  }

  @Post()
  async createAdvertisement(
    @Body() createAdvertisementDto: CreateAdvertisementDto,
  ) {
    try {
      await this.createAdvertisementUseCase.execute(createAdvertisementDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateAdvertisement(
    @Param('id') advertisementId: string,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
  ) {
    const id = parseInt(advertisementId);

    await this.updateAdvertisementUseCase.execute(updateAdvertisementDto, id);
  }

  @Delete(':id')
  async deleteAdvertisement(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    await this.deleteAdvertisementUseCase.execute(id);
  }
}
