import { AdvertisementRepository } from '../../application/interfaces/advertisement.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { Advertisement } from '../../domain/entities/advertisement';
import { PrismaAdvertisementMapper } from '../mappers/prisma-advertisement.mapper';
import { Injectable } from '@nestjs/common';
import { AdvertisementSearchResult } from '../../domain/entities/advertisement-search-result';

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

  async findByCity(
    cityId: number,
    page: number,
    pageSize: number,
  ): Promise<AdvertisementSearchResult> {
    const skip = (page - 1) * pageSize;

    const totalItems = await this.prisma.advertisement.count({
      where: {
        cityId,
      },
    });

    const advertisements = await this.prisma.advertisement.findMany({
      include: {
        owner: true,
        state: true,
        city: true,
      },
      where: {
        cityId,
      },
      skip: skip,
      take: pageSize,
    });

    const adsDto = advertisements.map((ad) =>
      PrismaAdvertisementMapper.toDomain(ad),
    );

    const searchResult = new AdvertisementSearchResult({
      total: totalItems,
      advertisements: adsDto,
    });

    return searchResult;
  }

  async deleteById(advertisementId: number): Promise<void> {
    await this.prisma.advertisement.delete({
      where: {
        id: advertisementId,
      },
    });
  }
}
