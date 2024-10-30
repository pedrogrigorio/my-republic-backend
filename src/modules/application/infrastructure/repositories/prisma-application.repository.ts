import { PrismaApplicationMapper } from '../mappers/prisma-application.mapper';
import { ApplicationRepository } from '../../application/interfaces/application.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { Application } from '../../domain/entities/application';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaApplicationRepository implements ApplicationRepository {
  constructor(private prisma: PrismaService) {}

  async create(application: Application): Promise<void> {
    const rawApplication = PrismaApplicationMapper.toPrisma(application);

    await this.prisma.application.create({
      data: rawApplication,
    });
  }

  async findAll(): Promise<Application[]> {
    const applications = await this.prisma.application.findMany({
      include: {
        advertisement: true,
      },
    });

    return applications.map((app) => PrismaApplicationMapper.toDomain(app));
  }

  async findByUser(
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<Application[]> {
    const applications = await this.prisma.application.findMany({
      include: {
        advertisement: true,
      },
      where: {
        applicantId: userId,
      },
    });

    return applications.map((app) => PrismaApplicationMapper.toDomain(app));
  }

  async deleteById(applicationId: number): Promise<void> {
    await this.prisma.application.delete({
      where: {
        id: applicationId,
      },
    });
  }
}
