import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { PoolModule } from '../pool/pool.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    PoolModule,
    MailModule
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService]
})
export class SecurityModule {}
