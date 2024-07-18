import { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user-repository';
import { UpdatePasswordUseCase } from './application/use-cases/update-password.usecase';
import { UpdateEmailUseCase } from './application/use-cases/update-email.usecase';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.usecase';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateNameUseCase } from './application/use-cases/update-name.usecase';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './application/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UpdatePhotoUseCase } from './application/use-cases/update-photo.usecase';

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
  ],
})
export class UserModule {}
