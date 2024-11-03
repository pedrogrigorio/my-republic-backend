import { PrismaApplicationMapper } from '../mappers/prisma-application.mapper';
import { ApplicationRepository } from '../../application/interfaces/application.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { Application } from '../../domain/entities/application';
import { Injectable } from '@nestjs/common';
import { ApplicationPage } from '../../domain/entities/application-page';

@Injectable()
export class PrismaApplicationRepository implements ApplicationRepository {
  constructor(private prisma: PrismaService) {}

  async create(application: Application): Promise<void> {
    const rawApplication = PrismaApplicationMapper.toPrisma(application);

    await this.prisma.application.create({
      data: {
        applicantId: rawApplication.applicantId,
        advertisementId: rawApplication.advertisementId,
        message: rawApplication.message,
      },
    });
  }

  async update(application: Application): Promise<void> {
    const rawApplication = PrismaApplicationMapper.toPrisma(application);

    await this.prisma.application.update({
      where: {
        id: rawApplication.id,
      },
      data: rawApplication,
    });
  }

  async findAll(): Promise<Application[]> {
    const applications = await this.prisma.application.findMany({
      include: {
        applicant: true,
        advertisement: {
          include: {
            city: true,
            state: true,
          },
        },
      },
    });

    return applications.map((app) => PrismaApplicationMapper.toDomain(app));
  }

  async findById(applicationId: any): Promise<Application> {
    const application = await this.prisma.application.findUnique({
      include: {
        applicant: true,
        advertisement: {
          include: {
            city: true,
            state: true,
          },
        },
      },
      where: {
        id: applicationId,
      },
    });

    return PrismaApplicationMapper.toDomain(application);
  }

  async findByUser(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<ApplicationPage> {
    const skip = (page - 1) * pageSize;

    const totalItems = await this.prisma.application.count({
      where: {
        applicantId: userId,
      },
    });

    const applications = await this.prisma.application.findMany({
      include: {
        applicant: true,
        advertisement: {
          include: {
            city: true,
            state: true,
          },
        },
      },
      where: {
        applicantId: userId,
      },
      skip: skip,
      take: pageSize,
    });

    const appsDto = applications.map((app) =>
      PrismaApplicationMapper.toDomain(app),
    );

    const applicationPage = new ApplicationPage({
      total: totalItems,
      applications: appsDto,
    });

    return applicationPage;
  }

  async findByAdvertisementId(
    advertisementId: number,
    page: number,
    pageSize: number,
  ): Promise<ApplicationPage> {
    const skip = (page - 1) * pageSize;

    const totalItems = await this.prisma.application.count({
      where: {
        advertisementId,
        status: 'PENDING',
      },
    });

    const applications = await this.prisma.application.findMany({
      include: {
        applicant: true,
        advertisement: {
          include: {
            city: true,
            state: true,
          },
        },
      },
      where: {
        advertisementId,
        status: 'PENDING',
      },
      skip: skip,
      take: pageSize,
    });

    const appsDto = applications.map((app) =>
      PrismaApplicationMapper.toDomain(app),
    );

    const applicationPage = new ApplicationPage({
      total: totalItems,
      applications: appsDto,
    });

    return applicationPage;
  }

  async deleteById(applicationId: number): Promise<void> {
    await this.prisma.application.delete({
      where: {
        id: applicationId,
      },
    });
  }
}
