import { NestFactory } from '@nestjs/core';
import { redis } from 'config/ms.config';
import { AppModule } from './app.module';
import { answer_bootstrap } from './answer_listener';
import { question_bootstrap } from './question_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(redis)
  app.enableCors()
  app.startAllMicroservices(() => {
    console.log('Display-Answers MS is listening for question and answer updates...');
  })
  const port = process.env.PORT || 3006
  await app.listen(port);
}
bootstrap();
// question_bootstrap();
// answer_bootstrap();