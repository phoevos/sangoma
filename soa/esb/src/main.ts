import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from 'config/url.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || PORT
  await app.listen(port);
}
bootstrap();
