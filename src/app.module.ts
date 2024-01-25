import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccountsModule } from './accounts/accounts.module';
import { AudiobookModule } from './audiobook/audiobook.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ChapterModule } from './chapter/chapter.module';
import { CheckoutModule } from './checkout/checkout.module';
import { envSchema } from './env';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true
    }),
    AccountsModule,
    AuthModule,
    AudiobookModule,
    ChapterModule,
    CheckoutModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    ConfigService
  ]
})
export class AppModule { }
