import { StateResponseDto } from './state-response.dto';
import { OwnerResponseDto } from './owner-response.dto';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from '@src/core/enums/gender';

export class AdvertisementResponseDto {
  id: number;
  title: string;
  description: string;
  price: number;
  genderPreference: Gender;
  allowOppositeGender: boolean;
  totalSlots: number;
  occupiedSlots: number;
  bedroomType: BedroomType;
  numBedroom: number;
  numBathroom: number;
  hasPet: boolean;
  city: {
    id: number;
    name: string;
    stateId: number;
  };
  state: StateResponseDto;
  owner: OwnerResponseDto;
}
