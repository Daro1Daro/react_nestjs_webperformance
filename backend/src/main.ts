import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later',
  }));
  // const createAccountLimiter = rateLimit({
  //   windowMs: 60 * 60 * 1000,
  //   max: 3,
  //   message: 'Too many accounts created from this IP, please try again after an hour',
  // });
  // app.use('/api/auth/register', createAccountLimiter);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  // app.enableCors();
  app.use(cookieParser());
  await app.listen(3000);
}

bootstrap();
