import configSchema from '@config/config.schema';
import serverConfig from '@config/server.config';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule as ConfigModulePackage } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CacheModule.register({
      ttl: 1,
      max: 20,
    }),
    ConfigModulePackage.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
      envFilePath: `environment/.env.${process.env.NODE_ENV || 'development'}`,
      load: [serverConfig],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    ModulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
