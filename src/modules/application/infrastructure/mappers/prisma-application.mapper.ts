import { Application } from '../../domain/entities/application';

import { ApplicationStatus } from '../../domain/enums/application-status';
import { Advertisement } from '../../domain/entities/advertisement';
import {
  Application as RawApplication,
  Advertisement as RawAdvertisement,
} from '@prisma/client';

type PrismaApplication = RawApplication & {
  advertisement: RawAdvertisement;
};

export class PrismaApplicationMapper {
  static toPrisma(application: Application): RawApplication {
    return {
      id: application.id,
      applicantId: application.applicantId,
      advertisementId: application.advertisementId,
      status: application.status,
      createdAt: application.createdAt,
    };
  }

  static toDomain(raw: PrismaApplication): Application {
    return new Application(
      {
        advertisementId: raw.advertisementId,
        advertisement: new Advertisement(
          {
            title: raw.advertisement.title,
            price: raw.advertisement.price,
            imgSrc: raw.advertisement.imgSrc,
            cityName: 'Get from another advertisement table',
            stateName: 'Get from another advertisement table',
          },
          raw.advertisement.id,
        ),
        applicantId: raw.applicantId,
        createdAt: raw.createdAt,
        status: raw.status as ApplicationStatus,
      },
      raw.id,
    );
  }
}
