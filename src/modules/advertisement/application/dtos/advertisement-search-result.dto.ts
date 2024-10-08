import { AdvertisementResponseDto } from './advertisement-response.dto';

export class AdvertisementSearchResultDto {
  total: number;
  advertisements: AdvertisementResponseDto[];
}
