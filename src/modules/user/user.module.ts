import { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user-repository';
import { UpdatePasswordUseCase } from './application/use-cases/update-password.usecase';
import { LocalStorageService } from '@src/core/storage/local-storage.service';
import { UpdateEmailUseCase } from './application/use-cases/update-email.usecase';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.usecase';
import { UpdatePhotoUseCase } from './application/use-cases/update-photo.usecase';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateNameUseCase } from './application/use-cases/update-name.usecase';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './application/interfaces/user.repository.interface';
import { StorageService } from './application/interfaces/storage.service.interface';
import { Module } from '@nestjs/common';

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
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
    {
      provide: StorageService,
      useClass: LocalStorageService,
    },
  ],
})
export class UserModule {}
