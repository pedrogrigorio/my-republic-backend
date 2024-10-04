import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/core/services/prisma/prisma.service';

@Injectable()
export class PrismaNotificationRepository {
  constructor(private prisma: PrismaService) {}
}
