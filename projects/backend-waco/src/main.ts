import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/utils/setup-swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  setupSwagger(app);

  await app.listen(4000);

  const url = await app
    .getUrl()
    .then((url) =>
      url.includes('[::1]') ? url.replace('[::1]', 'localhost') : url,
    );
  logger.verbose(`Server is running on ${url}`);
}
bootstrap();
