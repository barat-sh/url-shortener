import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    UrlsModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 3600000,
    }),
  ],
})
export class AppModule {}
