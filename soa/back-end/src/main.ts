import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger(bootstrap.name)
  const serverConfig = config.get('server')
  
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || serverConfig.port
  await app.listen(port);
  logger.log(`Server listening on port ${port}.`)
}
bootstrap();
