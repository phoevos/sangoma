import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as config from 'config';

const redis = config.get('redis')

export async function question_bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL || redis.url,
      password: process.env.REDIS_PASSWORD || redis.password
    },
  });
  app.listen(() => {
    console.log('Contributions MS is listening for question updates...');    
  })
}
