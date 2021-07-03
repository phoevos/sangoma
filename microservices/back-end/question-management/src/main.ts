import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth_bootstrap } from './auth_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3003);
}
bootstrap();
auth_bootstrap();
