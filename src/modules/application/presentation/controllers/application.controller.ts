import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetApplicationsByUserUseCase } from '../../application/use-cases/get-applications-by-user.usecase';
import { GetAllApplicationsUseCase } from '../../application/use-cases/get-all-applications.usecase';
import { DeleteApplicationUseCase } from '../../application/use-cases/delete-applications.usecase';
import { CreateApplicationDto } from '../../application/dtos/create-application.dto';
import { ApplyUseCase } from '../../application/use-cases/apply.usecase';
import { CurrentUser } from '@src/core/decorators/current-user.decorator';
import { AuthUserDto } from '@src/modules/auth/application/dtos/auth-user.dto';

@Controller('applications')
export class ApplicationController {
  constructor(
    private applyUseCase: ApplyUseCase,
    private deleteApplicationUseCase: DeleteApplicationUseCase,
    private getAllApplicationsUseCase: GetAllApplicationsUseCase,
    private getApplicationsByUserUseCase: GetApplicationsByUserUseCase,
  ) {}

  @Get()
  async getAllApplications() {
    return await this.getAllApplicationsUseCase.execute();
  }

  @Get('get-by-user')
  async getApplicationsByUser(@CurrentUser() user: AuthUserDto) {
    try {
      return await this.getApplicationsByUserUseCase.execute(user.id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async apply(
    @CurrentUser() user: AuthUserDto,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return await this.applyUseCase.execute(user.id, createApplicationDto);
  }

  @Delete(':id')
  async deleteApplication(@Param('id') advertisementId: string) {
    const id = parseInt(advertisementId);

    await this.deleteApplicationUseCase.execute(id);
  }
}
