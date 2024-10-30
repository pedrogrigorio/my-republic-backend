import { Application } from '../../domain/entities/application';

export abstract class ApplicationRepository {
  abstract create(application: Application): Promise<void>;
  abstract findAll(): Promise<Application[]>;
  abstract findByUser(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<Application[]>;

  abstract deleteById(applicationId: number): Promise<void>;
}
