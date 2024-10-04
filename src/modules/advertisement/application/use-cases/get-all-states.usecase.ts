import { StateRepository } from '../interfaces/state.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllStatesUseCase {
  constructor(private stateRepository: StateRepository) {}

  async execute() {
    const states = await this.stateRepository.findAll();

    return states;
  }
}
