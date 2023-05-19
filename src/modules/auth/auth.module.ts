import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SecurityModule } from '@modules/security/security.module';
import { IAuthModuleOptions, PassportModule } from '@nestjs/passport';
import { CONFIG_SERVER_JWT, CONFIG_SERVER_PASSPORT } from '@config/config.const';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { PoolModule } from '@modules/pool/pool.module';

@Module({
  imports: [
    SecurityModule,
    MailModule,
    PassportModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get<IAuthModuleOptions>(CONFIG_SERVER_PASSPORT),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => configService.get(CONFIG_SERVER_JWT),
      inject: [ConfigService],
    }),
    PoolModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
