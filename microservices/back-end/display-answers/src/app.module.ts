import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { questionsOrmConfig } from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(questionsOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
