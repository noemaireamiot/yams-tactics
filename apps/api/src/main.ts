import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const { APP_URL, API_URL, API_PORT } = process.env;

  const globalPrefix = 'api';

  app.enableCors({ origin: APP_URL, credentials: true });
  app.setGlobalPrefix(globalPrefix);

  const port = API_PORT || 3000;

  app.use(cookieParser(app.get(ConfigService).get('COOKIE_SECRET')));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: ${API_URL}:${port}/${globalPrefix}`
  );
}

bootstrap();
