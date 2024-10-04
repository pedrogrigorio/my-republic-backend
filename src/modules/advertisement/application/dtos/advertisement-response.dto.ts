import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from '@src/core/enums/gender';
import { CityResponseDto } from './city-response.dto';
import { StateResponseDto } from './state-response.dto';
import { UserResponseDto } from '@src/modules/user/application/dtos/user-response.dto';

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
  city: CityResponseDto;
  state: StateResponseDto;
  owner: UserResponseDto;
}
