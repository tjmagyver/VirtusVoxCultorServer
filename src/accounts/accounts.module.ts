import { CreateAccountController } from '@/controllers/accounts/create-account.controller';
import { FindAllAccountController } from '@/controllers/accounts/find-all-accounts.controller';
import { FindMyAccountController } from '@/controllers/accounts/find-my-account.controller';
import { FindOneAccountController } from '@/controllers/accounts/find-one-account.controller';
import { UpdatePasswordAccountController } from '@/controllers/accounts/update-password-account.controller';
import { UpdateSignatureAccountController } from '@/controllers/accounts/update-signature-account.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Module({
  providers: [PrismaService],
  controllers: [
    CreateAccountController,
    FindOneAccountController,
    FindMyAccountController,
    FindAllAccountController,
    UpdateSignatureAccountController,
    UpdatePasswordAccountController
  ],
})
export class AccountsModule { }