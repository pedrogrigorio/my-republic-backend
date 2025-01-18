import { GetApplicationsByAdvertisementUseCase } from '../../application/use-cases/get-applications-by-advertisement.usecase';
import { GetApplicationsByUserUseCase } from '../../application/use-cases/get-applications-by-user.usecase';
import { GetAllApplicationsUseCase } from '../../application/use-cases/get-all-applications.usecase';
import { DeleteApplicationUseCase } from '../../application/use-cases/delete-applications.usecase';
import { RefuseApplicationUseCase } from '../../application/use-cases/refuse-application.usecase';
import { AcceptApplicationUseCase } from '../../application/use-cases/accept-application.usecase';
import { CreateApplicationDto } from '../../application/dtos/create-application.dto';
import { ApplyUseCase } from '../../application/use-cases/apply.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUserId } from '@src/core/decorators/current-user-id.decorator';

@Controller('applications')
export class ApplicationController {
  constructor(
    private applyUseCase: ApplyUseCase,
    private deleteApplicationUseCase: DeleteApplicationUseCase,
    private getAllApplicationsUseCase: GetAllApplicationsUseCase,
    private getApplicationsByUserUseCase: GetApplicationsByUserUseCase,
    private getApplicationsByAdvertisementUseCase: GetApplicationsByAdvertisementUseCase,
    private refuseApplicationUseCase: RefuseApplicationUseCase,
    private acceptApplicationUseCase: AcceptApplicationUseCase,
  ) {}

  @Get()
  async getAllApplications() {
    return await this.getAllApplicationsUseCase.execute();
  }

  @Get('get-by-user')
  async getApplicationsByUser(@CurrentUserId() userId: number) {
    return await this.getApplicationsByUserUseCase.execute(userId);
  }

  @Get('get-by-ad/:id')
  async getApplicationsByAdvertisement(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    return await this.getApplicationsByAdvertisementUseCase.execute(id);
  }

  @Post()
  async apply(
    @CurrentUserId() userId: number,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return await this.applyUseCase.execute(userId, createApplicationDto);
  }

  @Patch(':id/refuse')
  async refuseApplication(@Param('id') applicationId: string) {
    const id = parseInt(applicationId);

    return await this.refuseApplicationUseCase.execute(id);
  }

  @Patch(':id/accept')
  async acceptApplication(@Param('id') applicationId: string) {
    const id = parseInt(applicationId);

    return await this.acceptApplicationUseCase.execute(id);
  }

  @Delete(':id')
  async deleteApplication(@Param('id') applicationId: string) {
    const id = parseInt(applicationId);

    await this.deleteApplicationUseCase.execute(id);
  }
}
