import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { BedroomType } from '../../domain/enums/bedroomtype';
import { Gender } from '@src/core/enums/gender';
import { Type } from 'class-transformer';
import { AmenitiesDto } from './amenities.dto';
import { RulesDto } from './rules.dto';

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

  phone: string;

  @ValidateNested()
  @Type(() => AmenitiesDto)
  amenities: AmenitiesDto;

  @ValidateNested()
  @Type(() => RulesDto)
  rules: RulesDto;
}
