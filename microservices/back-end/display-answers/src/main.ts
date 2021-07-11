import { NestFactory } from '@nestjs/core';
import { redis } from 'config/ms.config';
import { AppModule } from './app.module';

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