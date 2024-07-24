import { UpdatePasswordUseCase } from './application/use-cases/update-password.usecase';
import { GetUserByEmailUseCase } from './application/use-cases/get-user-by-email.usecase';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user-repository';
import { UpdateEmailUseCase } from './application/use-cases/update-email.usecase';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.usecase';
import { UpdatePhotoUseCase } from './application/use-cases/update-photo.usecase';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.usecase';
import { UpdateNameUseCase } from './application/use-cases/update-name.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { S3StorageService } from '@src/core/storage/s3-storage.service';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './application/interfaces/user.repository.interface';
import { StorageService } from './application/interfaces/storage.service.interface';
import { PrismaService } from '@src/core/prisma/prisma.service';
import { SignUpUseCase } from './application/use-cases/sign-up.usecase';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    SignUpUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
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
  exports: [GetUserByEmailUseCase],
})
export class UserModule {}
