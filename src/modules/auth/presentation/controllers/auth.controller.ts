import { LocalAuthGuard } from '../../infrastrucutre/guards/local-auth.guard';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthUserDto } from '../../application/dtos/auth-user.dto';
import { isPublic } from '../decorators/is-public.decorator';
import {
  Controller,
  HttpStatus,
  UseGuards,
  HttpCode,
  Post,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @isPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: AuthUserDto) {
    return await this.loginUseCase.execute(user);
  }
}
