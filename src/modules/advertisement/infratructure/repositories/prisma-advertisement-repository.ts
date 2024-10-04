import { AdvertisementRepository } from '../../application/interfaces/advertisement.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { Advertisement } from '../../domain/entities/advertisement';
import { PrismaAdvertisementMapper } from '../mappers/prisma-advertisement.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAdvertisementRepository implements AdvertisementRepository {
  constructor(private prisma: PrismaService) {}

  async create(advertisement: Advertisement): Promise<Advertisement> {
    const raw = PrismaAdvertisementMapper.toPrisma(advertisement);

    const createdAd = await this.prisma.advertisement.create({
      data: raw,
      include: {
        owner: true,
        state: true,
        city: true,
      },
    });

    return PrismaAdvertisementMapper.toDomain(createdAd);
  }

  async update(advertisement: Advertisement): Promise<Advertisement> {
    const raw = PrismaAdvertisementMapper.toPrisma(advertisement);

    const updatedAd = await this.prisma.advertisement.update({
      data: raw,
      where: {
        id: advertisement.id,
      },
      include: {
        owner: true,
        state: true,
        city: true,
      },
    });

    return PrismaAdvertisementMapper.toDomain(updatedAd);
  }

  async findAll(): Promise<Advertisement[]> {
    const advertisements = await this.prisma.advertisement.findMany({
      include: {
        owner: true,
        state: true,
        city: true,
      },
    });

    return advertisements.map((ad) => PrismaAdvertisementMapper.toDomain(ad));
  }

  async findById(advertisementId: number): Promise<Advertisement> {
    const ad = await this.prisma.advertisement.findUnique({
      where: {
        id: advertisementId,
      },
      include: {
        owner: true,
        state: true,
        city: true,
      },
    });

    if (!ad) {
      return null;
    }

    return PrismaAdvertisementMapper.toDomain(ad);
  }

  async deleteById(advertisementId: number): Promise<void> {
    await this.prisma.advertisement.delete({
      where: {
        id: advertisementId,
      },
    });
  }
}
