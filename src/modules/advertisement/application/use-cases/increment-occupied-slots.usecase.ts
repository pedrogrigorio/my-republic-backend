import { AdvertisementNotFoundException } from '../../domain/exceptions/advertisement-not-found.exception';
import { CreateNotificationUseCase } from '@src/modules/notification/application/use-cases/create-notification.usecase';
import { AdvertisementRepository } from '../interfaces/advertisement.repository.interface';
import { Injectable } from '@nestjs/common';
import { NotificationType } from '@src/modules/notification/domain/enums/notification-type';

@Injectable()
export class IncrementOccupiedSlotsUseCase {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private createNotificationUseCase: CreateNotificationUseCase,
  ) {}

  async execute(advertisementId: number): Promise<void> {
    const advertisement =
      await this.advertisementRepository.findById(advertisementId);

    if (!advertisement) {
      throw new AdvertisementNotFoundException(
        `Advertisement with id ${advertisementId} not found`,
      );
    }

    advertisement.occupiedSlots += 1;

    if (advertisement.occupiedSlots === advertisement.totalSlots) {
      advertisement.isActive = false;

      this.createNotificationUseCase.execute({
        recipientId: advertisement.owner.id,
        message: `Seu anúncio entitulado ${advertisement.title} foi pausado automaticamente devido a quantidade de vagas remanescentes.`,
        type: NotificationType.ADVERTISEMENT_PAUSED,
      });
    }

    await this.advertisementRepository.update(advertisement);
  }
}
