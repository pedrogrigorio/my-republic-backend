import { CreateNotificationUseCase } from '@src/modules/notification/application/use-cases/create-notification.usecase';
import { ApplicationStatus } from '../../domain/enums/application-status';
import { ApplicationNotFoundException } from '../../domain/exceptions/application-not-found.exception';
import { ApplicationRepository } from '../interfaces/application.repository.interface';
import { Injectable } from '@nestjs/common';
import { NotificationType } from '@src/modules/notification/domain/enums/notification-type';
import { IncrementOccupiedSlotsUseCase } from '@src/modules/advertisement/application/use-cases/increment-occupied-slots.usecase';
import { AdvertisementPausedException } from '../../domain/exceptions/advertisement-paused.exception';

@Injectable()
export class AcceptApplicationUseCase {
  constructor(
    private applicationRepository: ApplicationRepository,
    private createNotificationUseCase: CreateNotificationUseCase,
    private incrementOccupiedSlotsUseCase: IncrementOccupiedSlotsUseCase,
  ) {}

  async execute(applicationId: number) {
    const application =
      await this.applicationRepository.findById(applicationId);

    if (!application) {
      throw new ApplicationNotFoundException(
        `Application with id ${applicationId} not found`,
      );
    }

    if (application.advertisement.isActive === false) {
      throw new AdvertisementPausedException(`Advertisement paused`);
    }

    application.status = ApplicationStatus.ACCEPTED;

    await this.createNotificationUseCase.execute({
      type: NotificationType.APPLICATION_ACCEPTED,
      recipientId: application.applicantId,
      message: `Você foi aceito na república ${application.advertisement.title}`,
    });

    await this.incrementOccupiedSlotsUseCase.execute(
      application.advertisement.id,
    );

    await this.applicationRepository.update(application);
  }
}
