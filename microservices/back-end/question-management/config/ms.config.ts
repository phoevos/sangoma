import { Transport } from "@nestjs/microservices";
import * as config from 'config';

const rds = config.get('redis')

export const redis = {
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL || rds.url,
      password: process.env.REDIS_PASSWORD || rds.password,
    },
  }