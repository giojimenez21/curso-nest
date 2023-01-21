import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo me deja la data del body necesaria.
      forbidNonWhitelisted: true // Regresa un error con las propiedades no necesarias.
    })
  );
  await app.listen(3000);
}
bootstrap();
