import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  // Swagger
  initSwagger(app);

  // Security setup
  app.use(urlencoded({ extended: true }))
  app.use(json({
    limit: '15mb'
  }))
  app.use(helmet());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      message: 'Too many requests created from this IP, please try again after 5 minutes'
    }),
  );

  // compression
  app.use(compression());

  await app.listen(4000);
  Logger.log(`Application is running in on: ${await app.getUrl()}`);
}
bootstrap();
