import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.usecase';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UpdateEmailDto } from '../application/dtos/update-email.dto';
import { UpdateEmailUseCase } from '../application/use-cases/update-email.usecase';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private updateEmailUseCase: UpdateEmailUseCase,
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

  @Patch(':id/update-email')
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    const updatedUser = await this.updateEmailUseCase.execute(
      updateEmailDto,
      id,
    );

    return updatedUser;
  }
}
