import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth_bootstrap } from './auth_listener';
import { question_bootstrap } from './question_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const port = process.env.PORT || 3004
  await app.listen(port);
}
bootstrap();
auth_bootstrap();
question_bootstrap();
