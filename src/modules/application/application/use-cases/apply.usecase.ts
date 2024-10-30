import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { Application } from '../../domain/entities/application';

@Injectable()
export class ApplyUseCase {
  constructor(private applicationRepository: ApplicationRepository) {}

  async execute(createApplicationDto: CreateApplicationDto): Promise<void> {
    const application = new Application({
      advertisementId,
      applicantId,
    });

    await this.applicationRepository.create(application);
  }
}
