import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/signup')
  signup(@Body() signup: SignupDto) {
    return this.authService.signup(signup);
  }
  @Post('api/login')
  login() {
    return this.authService.login();
  }

  @Get('/api/logout')
  logout() {
    return this.authService.logout();
  }
}
