import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { usersOrmConfig } from 'config/typeorm.config';
import * as config from 'config';
import { amqpClientOptions } from '../config/amqp.config';
import { ClientsModule } from '@nestjs/microservices';

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forRoot(usersOrmConfig),
    ClientsModule.register(amqpClientOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
