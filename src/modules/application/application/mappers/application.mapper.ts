import { ApplicationResponseDto } from '../dtos/application-response.dto';
import { Application } from '../../domain/entities/application';

export class ApplicationMapper {
  static toDto(application: Application): ApplicationResponseDto {
    return {
      id: application.id,
      applicantId: application.applicantId,
      status: application.status,
      createdAt: application.createdAt,
      advertisement: {
        title: application.advertisement.title,
        price: application.advertisement.price,
        imgSrc: application.advertisement.imgSrc,
        stateName: application.advertisement.stateName,
        cityName: application.advertisement.cityName,
      },
    };
  }
}
