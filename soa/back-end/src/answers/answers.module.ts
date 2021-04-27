import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Keyword } from 'src/keywords/entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer, Keyword], 'questions'),
    AuthModule
  ],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
