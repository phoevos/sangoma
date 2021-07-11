import { NestFactory } from '@nestjs/core';
import { redis } from 'config/ms.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(redis)
  app.enableCors()
  app.startAllMicroservices(() => {
    console.log('Question-Management MS is listening for new users...');
  })
  const port = process.env.PORT || 3003
  await app.listen(port);
}
bootstrap();
