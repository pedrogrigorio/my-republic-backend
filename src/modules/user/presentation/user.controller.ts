import { UpdatePasswordUseCase } from '../application/use-cases/update-password.usecase';
import { UpdatePhotoUseCase } from '../application/use-cases/update-photo.usecase';
import { UpdateEmailUseCase } from '../application/use-cases/update-email.usecase';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.usecase';
import { UpdateNameUseCase } from '../application/use-cases/update-name.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { updatePasswordDto } from '../application/dtos/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateEmailDto } from '../application/dtos/update-email.dto';
import { SignUpUseCase } from '../application/use-cases/sign-up.usecase';
import { UpdateNameDto } from '../application/dtos/update-name.dto';
import { SignUpDto } from '../application/dtos/sign-up.dto';
import {
  BadRequestException,
  FileTypeValidator,
  UseInterceptors,
  ParseFilePipe,
  UploadedFile,
  Controller,
  Delete,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';
import { isPublic } from '@src/modules/auth/presentation/decorators/is-public.decorator';

@Controller('users')
export class UserController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private updateNameUseCase: UpdateNameUseCase,
    private updateEmailUseCase: UpdateEmailUseCase,
    private updatePasswordUseCase: UpdatePasswordUseCase,
    private updatePhotoUseCase: UpdatePhotoUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  async getUser() {
    const users = await this.getAllUsersUseCase.execute();
    return users;
  }

  @isPublic()
  @Post()
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.signUpUseCase.execute(signUpDto);
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
  @UseInterceptors(FileInterceptor('file'))
  async updatePhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /\/(jpg|jpeg|png)$/ })],
        exceptionFactory: () => {
          return new BadRequestException(
            'File must be an image of type jpg, jpeg, or png',
          );
        },
      }),
    )
    file: Express.Multer.File,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    const updatedUser = await this.updatePhotoUseCase.execute(file, id);

    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    const id = parseInt(userId);

    await this.deleteUserUseCase.execute(id);
  }
}
