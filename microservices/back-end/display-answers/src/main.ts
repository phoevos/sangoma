import { NestFactory } from '@nestjs/core';
import { answer_bootstrap } from './answer_listener';
import { AppModule } from './app.module';
import { question_bootstrap } from './question_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const port = process.env.PORT || 3006
  await app.listen(port);
}
bootstrap();
question_bootstrap();
answer_bootstrap();