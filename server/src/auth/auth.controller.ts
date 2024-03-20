import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/signup')
  signup(@Body() signup: SignupDto, @Res({ passthrough: true }) res) {
    return this.authService.signup(signup, res);
  }
  @Post('api/login')
  login(@Body() login: LoginDto, @Res({ passthrough: true }) res) {
    return this.authService.login(login, res);
  }

  @Get('/api/logout')
  logout(@Res({ passthrough: true }) res) {
    return this.authService.logout(res);
  }
}
