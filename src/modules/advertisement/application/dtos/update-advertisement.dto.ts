import { IsEnum, IsOptional } from 'class-validator';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from '@src/core/enums/gender';

export class UpdateAdvertisementDto {
  title: string;

  description: string;

  price: number;

  @IsOptional()
  @IsEnum(Gender)
  genderPreference: Gender;

  allowOppositeGender: boolean;

  totalSlots: number;
  occupiedSlots: number;

  @IsOptional()
  @IsEnum(BedroomType)
  bedroomType: BedroomType;

  numBedroom: number;

  numBathroom: number;

  hasPet: boolean;

  ownerId: number;

  cityId: number;

  stateId: number;
}
