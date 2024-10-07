import { PrismaStateMapper } from './prisma-state.mapper';
import { Advertisement } from '../../domain/entities/advertisement';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from '@src/core/enums/gender';
import { Owner } from '../../domain/entities/owner';
import {
  Advertisement as RawAdvertisement,
  State as RawState,
  User as RawUser,
  City as RawCity,
} from '@prisma/client';
import { City } from '../../domain/entities/city';

type PrismaAdvertisement = RawAdvertisement & {
  owner: RawUser;
  state: RawState;
  city: RawCity;
};

export class PrismaAdvertisementMapper {
  static toPrisma(advertisement: Advertisement): RawAdvertisement {
    return {
      id: advertisement.id,
      title: advertisement.title,
      price: advertisement.price,
      description: advertisement.description,
      genderPreference: advertisement.genderPreference,
      allowOppositeGender: advertisement.allowOppositeGender,
      totalSlots: advertisement.totalSlots,
      occupiedSlots: advertisement.occupiedSlots,
      bedroomType: advertisement.bedroomType,
      numBathroom: advertisement.numBathroom,
      numBedroom: advertisement.numBedroom,
      hasPet: advertisement.hasPet,
      ownerId: advertisement.ownerId,
      cityId: advertisement.cityId,
      stateId: advertisement.stateId,
    };
  }

  static toDomain(raw: PrismaAdvertisement): Advertisement {
    return new Advertisement(
      {
        title: raw.title,
        price: raw.price,
        description: raw.description,
        genderPreference: raw.genderPreference as Gender,
        allowOppositeGender: raw.allowOppositeGender,
        totalSlots: raw.totalSlots,
        occupiedSlots: raw.occupiedSlots,
        bedroomType: raw.bedroomType as BedroomType,
        numBathroom: raw.numBathroom,
        numBedroom: raw.numBedroom,
        hasPet: raw.hasPet,
        cityId: raw.cityId,
        stateId: raw.stateId,
        ownerId: raw.ownerId,
        city: new City(
          {
            name: raw.city.name,
            stateId: raw.city.stateId,
          },
          raw.city.id,
        ),
        state: PrismaStateMapper.toDomain(raw.state),
        owner: new Owner(
          {
            name: raw.owner.name,
          },
          raw.owner.id,
        ),
      },
      raw.id,
    );
  }
}
