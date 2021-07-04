import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { question_bootstrap } from './question_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3001);
}
bootstrap();
question_bootstrap();
