import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

export async function auth_bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://qaekhthq:y-Mt4YK-5A4qzE9VXwfryN2cLV4SEfZv@rat.rmq2.cloudamqp.com/qaekhthq'],
      queue: 'user_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen(() => {
    console.log('Question-Management MS listening...');    
  })
}
