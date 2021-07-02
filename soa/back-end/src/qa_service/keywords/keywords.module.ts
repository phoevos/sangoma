import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { Keyword } from './entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer, Keyword], 'questions')
  ],
  controllers: [KeywordsController],
  providers: [KeywordsService]
})
export class KeywordsModule {}
