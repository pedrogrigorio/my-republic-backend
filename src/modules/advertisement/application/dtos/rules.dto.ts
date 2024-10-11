import { IsBoolean } from 'class-validator';

export class RulesDto {
  @IsBoolean()
  noSmoking: boolean;

  @IsBoolean()
  noAlcohol: boolean;

  @IsBoolean()
  noParties: boolean;

  @IsBoolean()
  noPets: boolean;

  @IsBoolean()
  noNoiseAfter10: boolean;

  @IsBoolean()
  noUncleanAreas: boolean;

  @IsBoolean()
  noSharingKeys: boolean;

  @IsBoolean()
  noOvernightGuests: boolean;
}
