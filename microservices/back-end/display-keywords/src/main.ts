import { NestFactory } from '@nestjs/core';
import { redis } from 'config/ms.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(redis)
  app.enableCors()
  app.startAllMicroservices(() => {
    console.log('Display-Keywords MS is listening for question updates...');
  })
  const port = process.env.PORT || 3001
  await app.listen(port);
}
bootstrap();
