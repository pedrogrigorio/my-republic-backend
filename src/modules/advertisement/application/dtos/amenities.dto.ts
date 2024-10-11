import { IsBoolean } from 'class-validator';

export class AmenitiesDto {
  @IsBoolean()
  furnishedResidence: boolean;

  @IsBoolean()
  garage: boolean;

  @IsBoolean()
  airConditioning: boolean;

  @IsBoolean()
  swimmingPool: boolean;

  @IsBoolean()
  gym: boolean;

  @IsBoolean()
  nearbyMarket: boolean;

  @IsBoolean()
  laundry: boolean;

  @IsBoolean()
  publicTransportNearby: boolean;
}
