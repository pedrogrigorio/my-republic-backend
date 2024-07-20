import { UpdatePasswordUseCase } from './application/use-cases/update-password.usecase';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user-repository';
import { UpdateEmailUseCase } from './application/use-cases/update-email.usecase';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.usecase';
import { UpdatePhotoUseCase } from './application/use-cases/update-photo.usecase';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateNameUseCase } from './application/use-cases/update-name.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './application/interfaces/user.repository.interface';
import { StorageService } from './application/interfaces/storage.service.interface';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { S3StorageService } from '@src/core/storage/s3-storage.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    UpdateNameUseCase,
    UpdateEmailUseCase,
    UpdatePasswordUseCase,
    UpdatePhotoUseCase,
    DeleteUserUseCase,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: StorageService,
      useClass: S3StorageService,
    },
  ],
})
export class UserModule {}
