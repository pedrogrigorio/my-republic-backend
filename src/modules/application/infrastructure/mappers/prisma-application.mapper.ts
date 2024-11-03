import { Application } from '../../domain/entities/application';

import { ApplicationStatus } from '../../domain/enums/application-status';
import { Advertisement } from '../../domain/entities/advertisement';
import { State } from '../../domain/entities/state';
import { City } from '../../domain/entities/city';
import {
  Application as RawApplication,
  Advertisement as RawAdvertisement,
  City as RawCity,
  State as RawState,
  User as RawUser,
} from '@prisma/client';
import { Applicant } from '../../domain/entities/applicant';

type PrismaAdvertisement = RawAdvertisement & {
  city: RawCity;
  state: RawState;
};

type PrismaApplication = RawApplication & {
  advertisement: PrismaAdvertisement;
  applicant: RawUser;
};

export class PrismaApplicationMapper {
  static toPrisma(application: Application): RawApplication {
    return {
      id: application.id,
      applicantId: application.applicantId,
      message: application.message,
      advertisementId: application.advertisementId,
      status: application.status,
      createdAt: application.createdAt,
    };
  }

  static toDomain(raw: PrismaApplication): Application {
    return new Application(
      {
        advertisementId: raw.advertisementId,
        message: raw.message,
        advertisement: new Advertisement(
          {
            title: raw.advertisement.title,
            price: raw.advertisement.price,
            imgSrc: raw.advertisement.imgSrc,
            isActive: raw.advertisement.isActive,
            city: new City({ name: raw.advertisement.city.name }),
            state: new State({ uf: raw.advertisement.state.uf }),
          },
          raw.advertisement.id,
        ),
        applicant: new Applicant(
          {
            name: raw.applicant.name,
            imgSrc: raw.applicant.imgSrc,
          },
          raw.applicant.id,
        ),
        applicantId: raw.applicantId,
        createdAt: raw.createdAt,
        status: raw.status as ApplicationStatus,
      },
      raw.id,
    );
  }
}
