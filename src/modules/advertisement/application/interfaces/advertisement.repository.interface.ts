import { Advertisement } from '../../domain/entities/advertisement';

export abstract class AdvertisementRepository {
  abstract create(advertisement: Advertisement): Promise<Advertisement>;
  abstract update(advertisement: Advertisement): Promise<Advertisement>;
  abstract findAll(): Promise<Advertisement[]>;
  abstract findById(advertisementId: number): Promise<Advertisement>;
  abstract deleteById(advertisementId: number): Promise<void>;
}
