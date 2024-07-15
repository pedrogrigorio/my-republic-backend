import { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user-repository';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.usecase';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './application/repositories/user.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetAllUsersUseCase,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class UserModule {}
