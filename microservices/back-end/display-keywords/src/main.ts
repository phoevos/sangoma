import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { question_bootstrap } from './question_listener';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const port = process.env.PORT || 3001
  await app.listen(port);
}
bootstrap();
question_bootstrap();
