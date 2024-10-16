import { UpdatePasswordUseCase } from '../application/use-cases/update-password.usecase';
import { UpdatePhotoUseCase } from '../application/use-cases/update-photo.usecase';
import { UpdateEmailUseCase } from '../application/use-cases/update-email.usecase';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.usecase';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.usecase';
import { UpdateNameUseCase } from '../application/use-cases/update-name.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { updatePasswordDto } from '../application/dtos/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateEmailDto } from '../application/dtos/update-email.dto';
import { SignUpUseCase } from '../application/use-cases/sign-up.usecase';
import { UpdateNameDto } from '../application/dtos/update-name.dto';
import { SignUpDto } from '../application/dtos/sign-up.dto';
import { isPublic } from '@src/core/decorators/is-public.decorator';
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
  UseGuards,
} from '@nestjs/common';
import { UserOwnership } from '../infrastructure/guards/user-ownership.guard';

@Controller('users')
export class UserController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserById: GetUserByIdUseCase,
    private updateNameUseCase: UpdateNameUseCase,
    private updateEmailUseCase: UpdateEmailUseCase,
    private updatePasswordUseCase: UpdatePasswordUseCase,
    private updatePhotoUseCase: UpdatePhotoUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @isPublic()
  @Post()
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.signUpUseCase.execute(signUpDto);
  }

  @Get()
  async getAllUsers() {
    return await this.getAllUsersUseCase.execute();
  }

  @Get(':id')
  @UseGuards(UserOwnership)
  async getUser(@Param('id') userId: string) {
    const id = parseInt(userId);

    return await this.getUserById.execute(id);
  }

  @Patch(':id/update-name')
  @UseGuards(UserOwnership)
  async updateName(
    @Body() updateNameDto: UpdateNameDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.updateNameUseCase.execute(updateNameDto, id);
  }

  @Patch(':id/update-email')
  @UseGuards(UserOwnership)
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.updateEmailUseCase.execute(updateEmailDto, id);
  }

  @Patch(':id/update-password')
  @UseGuards(UserOwnership)
  async updatePassword(
    @Body() updatePasswordDto: updatePasswordDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.updatePasswordUseCase.execute(updatePasswordDto, id);
  }

  @Patch(':id/update-photo')
  @UseGuards(UserOwnership)
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
    try {
      const id = parseInt(userId);

      const updatedUser = await this.updatePhotoUseCase.execute(file, id);

      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  @UseGuards(UserOwnership)
  async deleteUser(@Param('id') userId: string) {
    const id = parseInt(userId);

    await this.deleteUserUseCase.execute(id);
  }
}
