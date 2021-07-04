import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { questionsOrmConfig, usersOrmConfig } from '../config/typeorm.config';
import { amqpClientOptions } from 'config/amqp.config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    TypeOrmModule.forRoot(usersOrmConfig),
    TypeOrmModule.forRoot(questionsOrmConfig),
    ClientsModule.register(amqpClientOptions)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy
  ],
})
export class AppModule {}
