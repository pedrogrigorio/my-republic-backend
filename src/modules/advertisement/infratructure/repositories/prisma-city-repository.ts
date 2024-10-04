import { CityRepository } from '../../application/interfaces/city.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { City } from '../../domain/entities/city';
import { PrismaCityMapper } from '../mappers/prisma-city.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCityRepository implements CityRepository {
  constructor(private prisma: PrismaService) {}

  async create(city: City): Promise<void> {
    await this.prisma.city.create({
      data: {
        name: city.name,
        stateId: city.stateId,
      },
    });
  }

  async update(city: City): Promise<void> {
    await this.prisma.city.update({
      data: {
        name: city.name,
        stateId: city.stateId,
      },
      where: {
        id: city.id,
      },
    });
  }

  async findAll(): Promise<City[]> {
    const cities = await this.prisma.city.findMany();

    return cities.map((city) => PrismaCityMapper.toDomain(city));
  }

  async findById(cityId: number): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });

    return PrismaCityMapper.toDomain(city);
  }

  async deleteById(cityId: number): Promise<void> {
    await this.prisma.city.delete({
      where: {
        id: cityId,
      },
    });
  }
}