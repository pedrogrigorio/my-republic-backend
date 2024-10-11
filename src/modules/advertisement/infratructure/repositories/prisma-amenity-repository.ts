import { PrismaAmenityMapper } from '../mappers/prisma-Amenity.mapper';
import { AmenityRepository } from '../../application/interfaces/amenity.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Amenity } from '../../domain/entities/Amenity';

@Injectable()
export class PrismaAmenityRepository implements AmenityRepository {
  constructor(private prisma: PrismaService) {}

  async create(amenity: Amenity): Promise<void> {
    const raw = PrismaAmenityMapper.toPrisma(amenity);

    await this.prisma.amenity.create({
      data: {
        tag: raw.tag,
        value: raw.value,
      },
    });
  }

  async findAll(): Promise<Amenity[]> {
    const amenity = await this.prisma.amenity.findMany();

    return amenity.map((amenity) => PrismaAmenityMapper.toDomain(amenity));
  }

  async findManyByTags(amenityTags: string[]): Promise<Amenity[]> {
    const amenities = await this.prisma.amenity.findMany({
      where: {
        tag: {
          in: amenityTags,
        },
      },
    });

    if (amenities.length === 0) return [];

    return amenities.map((amenity) => PrismaAmenityMapper.toDomain(amenity));
  }
}
