import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from '@src/core/enums/gender';
import { AmenitiesDto } from './amenities.dto';
import { RulesDto } from './rules.dto';
import { Type } from 'class-transformer';

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

  @IsNotEmpty()
  phone: string;

  @ValidateNested()
  @Type(() => AmenitiesDto)
  amenities: AmenitiesDto;

  @ValidateNested()
  @Type(() => RulesDto)
  rules: RulesDto;
}
