import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { questionsOrmConfig, usersOrmConfig } from '../config/typeorm.config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    TypeOrmModule.forRoot(usersOrmConfig),
    TypeOrmModule.forRoot(questionsOrmConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy
  ],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
})
export class AppModule {}
