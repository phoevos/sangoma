import { Transport, ClientsModuleOptions } from '@nestjs/microservices';
import * as config from 'config';

const redis = config.get('redis')

export const amqpClientOptions: ClientsModuleOptions = [{
  name: 'ANSWER_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: process.env.REDIS_URL || redis.url,
    password: process.env.REDIS_PASSWORD || redis.password
  },
}]