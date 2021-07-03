import { Transport, ClientsModuleOptions } from '@nestjs/microservices';

export const amqpClientOptions: ClientsModuleOptions = [{
    name: 'AUTH_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://qaekhthq:y-Mt4YK-5A4qzE9VXwfryN2cLV4SEfZv@rat.rmq2.cloudamqp.com/qaekhthq'],
      queue: 'user_queue',
      queueOptions: {
        durable: false
      },
    },
  }]