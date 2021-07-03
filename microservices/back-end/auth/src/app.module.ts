import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { usersOrmConfig } from 'config/typeorm.config';
import * as config from 'config';

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    }),
    TypeOrmModule.forRoot(usersOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
