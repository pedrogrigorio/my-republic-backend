import { StateRepository } from '../interfaces/state.repository.interface';
import { LocaleService } from '../interfaces/locale.service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PopulateStatesUseCase {
  constructor(
    private stateRepository: StateRepository,
    private localeService: LocaleService,
  ) {}

  async execute() {
    const states = await this.localeService.getStates();

    states.map(async (state) => await this.stateRepository.create(state));
  }
}
