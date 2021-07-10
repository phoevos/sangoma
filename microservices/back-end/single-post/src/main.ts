import { NestFactory } from '@nestjs/core';
import { redis } from 'config/ms.config';
import { AppModule } from './app.module';
import { auth_bootstrap } from './auth_listener';
import { question_bootstrap } from './question_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(redis)
  app.enableCors()
  app.startAllMicroservices(() => {
    console.log('Single-Post MS is listening for question updates and new users...');
  })
  const port = process.env.PORT || 3004
  await app.listen(port);
}
bootstrap();
// auth_bootstrap();
// question_bootstrap();
