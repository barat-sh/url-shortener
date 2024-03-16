import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/api/:id')
  getUser(
    @Res({ passthrough: true }) res,
    @Req() req,
    @Param() params: { id: string },
  ) {
    return this.usersService.getUser(res, params.id, req);
  }
}
