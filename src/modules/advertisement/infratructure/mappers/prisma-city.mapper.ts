import { City as RawCity } from '@prisma/client';
import { City } from '../../domain/entities/city';

export class PrismaCityMapper {
  static toPrisma(city: City): RawCity {
    return {
      id: city.id,
      name: city.name,
      stateId: city.stateId,
    };
  }

  static toDomain(raw: RawCity): City {
    return new City(
      {
        name: raw.name,
        stateId: raw.stateId,
      },
      raw.id,
    );
  }
}
