import { IsEnum, IsNotEmpty } from 'class-validator';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from '@src/core/enums/gender';

export class CreateAdvertisementDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  genderPreference: Gender;

  @IsNotEmpty()
  allowOppositeGender: boolean;

  @IsNotEmpty()
  totalSlots: number;

  @IsNotEmpty()
  occupiedSlots: number;

  @IsEnum(BedroomType)
  @IsNotEmpty()
  bedroomType: BedroomType;

  @IsNotEmpty()
  numBedroom: number;

  @IsNotEmpty()
  numBathroom: number;

  @IsNotEmpty()
  hasPet: boolean;

  @IsNotEmpty()
  ownerId: number;

  @IsNotEmpty()
  cityId: number;

  @IsNotEmpty()
  stateId: number;
}
