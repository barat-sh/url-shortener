import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { JwtStrategy } from 'src/auth/jwt.statergy';
import { UrlsController } from './urls.controller';

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, JwtStrategy],
})
export class UrlsModule {}
