import { Controller, Get, Post } from '@nestjs/common';
import { PopulateStatesUseCase } from '../../application/use-cases/populate-states.usecase';
import { GetAllStatesUseCase } from '../../application/use-cases/get-all-states.usecase';

@Controller('states')
export class StateController {
  constructor(
    private getAllStatesUseCase: GetAllStatesUseCase,
    private populateStatesUseCase: PopulateStatesUseCase,
  ) {}

  @Get()
  async getAllStates() {
    return await this.getAllStatesUseCase.execute();
  }

  @Post('populate')
  async populateStates() {
    return await this.populateStatesUseCase.execute();
  }
}
