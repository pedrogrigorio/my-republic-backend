import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../infrastrucutre/guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthUserDto } from '../../application/dtos/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post()
  async signup() {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: AuthUserDto) {
    console.log(user);
  }
}
