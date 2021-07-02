import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { questionsOrmConfig, usersOrmConfig } from './config/typeorm.config';
import { QuestionsModule } from './qa_service/questions/questions.module';
import { AnswersModule } from './qa_service/answers/answers.module';
import { KeywordsModule } from './qa_service/keywords/keywords.module';
import { DiagramModule } from './diagram/diagram.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(usersOrmConfig),
    TypeOrmModule.forRoot(questionsOrmConfig),
    AuthModule,
    QuestionsModule,
    AnswersModule,
    KeywordsModule,
    DiagramModule
  ]
})
export class AppModule {}
