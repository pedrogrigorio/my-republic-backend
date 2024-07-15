import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.usecase';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../application/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Get()
  async getUser() {
    const users = await this.getAllUsersUseCase.execute();
    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.createUserUseCase.execute(createUserDto);
  }
}
