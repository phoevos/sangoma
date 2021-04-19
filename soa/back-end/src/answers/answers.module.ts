import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer], 'questions'),
    AuthModule
  ],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
