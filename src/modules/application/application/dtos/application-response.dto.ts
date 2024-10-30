import { ApplicationStatus } from '../../domain/enums/application-status';

export class ApplicationResponseDto {
  id: number;
  status: ApplicationStatus;
  createdAt: Date;
  applicantId: number;
  advertisement: {
    title: string;
    price: number;
    imgSrc: string;
    cityName: string;
    stateName: string;
  };
}
