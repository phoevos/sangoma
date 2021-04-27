import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Question } from './entities/question.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { Keyword } from 'src/keywords/entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer, Keyword], 'questions'),
    AuthModule
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
