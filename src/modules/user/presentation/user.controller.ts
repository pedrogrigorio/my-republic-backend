import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.usecase';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UpdateEmailDto } from '../application/dtos/update-email.dto';
import { UpdateEmailUseCase } from '../application/use-cases/update-email.usecase';
import { updatePasswordDto } from '../application/dtos/update-password.dto';
import { UpdatePasswordUseCase } from '../application/use-cases/update-password.usecase';
import { UpdateNameDto } from '../application/dtos/update-name.dto';
import { UpdateNameUseCase } from '../application/use-cases/update-name.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private updateNameUseCase: UpdateNameUseCase,
    private updateEmailUseCase: UpdateEmailUseCase,
    private updatePasswordUseCase: UpdatePasswordUseCase,
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

  @Patch(':id/update-name')
  async updateName(
    @Body() updateNameDto: UpdateNameDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.updateNameUseCase.execute(updateNameDto, id);
  }

  @Patch(':id/update-email')
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.updateEmailUseCase.execute(updateEmailDto, id);
  }

  @Patch(':id/update-password')
  async updatePassword(
    @Body() updatePasswordDto: updatePasswordDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.updatePasswordUseCase.execute(updatePasswordDto, id);
  }

  @Patch(':id/update-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const newFileName = Date.now() + fileExtName;
          callback(null, newFileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  async updatePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') userId: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is not a image');
    }

    const id = parseInt(userId);

    console.log(file);
  }
}
