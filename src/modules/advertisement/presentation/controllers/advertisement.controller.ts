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
} from '@nestjs/common';

@Controller('advertisements')
export class AdvertisementController {
  constructor(
    private getAllAdvertisementsUseCase: GetAllAdvertisementsUseCase,
    private deleteAdvertisementUseCase: DeleteAdvertisementUseCase,
    private getAdvertisementById: GetAdvertisementByIdUseCase,
    private createAdvertisementUseCase: CreateAdvertisementUseCase,
    private updateAdvertisementUseCase: UpdateAdvertisementUseCase,
  ) {}

  @isPublic()
  @Get()
  async getAllAdvertisements() {
    return await this.getAllAdvertisementsUseCase.execute();
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
    await this.createAdvertisementUseCase.execute(createAdvertisementDto);
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
