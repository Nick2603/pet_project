import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors();

  app.use(compression());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appConfigService = app.get(AppConfigService);

  const port = appConfigService.port;

  await app.listen(port);
}

bootstrap();
