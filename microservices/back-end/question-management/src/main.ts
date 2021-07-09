import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth_bootstrap } from './auth_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const port = process.env.PORT || 3003
  await app.listen(port);
}
bootstrap();
auth_bootstrap();
