import { StateRepository } from '../../application/interfaces/state.repository.interface';
import { PrismaService } from '@src/core/services/prisma/prisma.service';
import { State } from '../../domain/entities/state';
import { PrismaStateMapper } from '../mappers/prisma-state.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaStateRepository implements StateRepository {
  constructor(private prisma: PrismaService) {}

  async create(state: State): Promise<void> {
    await this.prisma.state.create({
      data: {
        uf: state.uf,
        name: state.name,
      },
    });
  }

  async update(state: State): Promise<void> {
    await this.prisma.state.update({
      data: {
        uf: state.uf,
        name: state.name,
      },
      where: {
        id: state.id,
      },
    });
  }

  async findAll(): Promise<State[]> {
    const states = await this.prisma.state.findMany();

    return states.map((state) => PrismaStateMapper.toDomain(state));
  }

  async findById(stateId: number): Promise<State> {
    const state = await this.prisma.state.findUnique({
      where: {
        id: stateId,
      },
    });

    return PrismaStateMapper.toDomain(state);
  }

  async deleteById(stateId: number): Promise<void> {
    await this.prisma.state.delete({
      where: {
        id: stateId,
      },
    });
  }
}
