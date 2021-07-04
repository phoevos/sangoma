import { NestFactory } from '@nestjs/core';
import { answer_bootstrap } from './answer_listener';
import { AppModule } from './app.module';
import { question_bootstrap } from './question_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3005);
}
bootstrap();
question_bootstrap();
answer_bootstrap();
