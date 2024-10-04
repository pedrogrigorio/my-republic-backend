import { Advertisement } from '../../domain/entities/advertisement';
import { AdvertisementResponseDto } from '../dtos/advertisement-response.dto';

export class AdvertisementMapper {
  static toDto(advertisement: Advertisement): AdvertisementResponseDto {
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
      city: {
        id: advertisement.city.id,
        name: advertisement.city.name,
        stateId: advertisement.city.stateId,
      },
      state: {
        id: advertisement.state.id,
        uf: advertisement.state.uf,
        name: advertisement.state.name,
      },
      owner: {
        id: advertisement.owner.id,
        name: advertisement.owner.name,
        email: advertisement.owner.email,
        gender: advertisement.owner.gender,
        imgSrc: advertisement.owner.imgSrc,
      },
    };
  }
}
