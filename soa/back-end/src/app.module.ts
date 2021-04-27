import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { questionsOrmConfig, usersOrmConfig } from './config/typeorm.config';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { KeywordsModule } from './keywords/keywords.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(usersOrmConfig),
    TypeOrmModule.forRoot(questionsOrmConfig),
    AuthModule,
    QuestionsModule,
    AnswersModule,
    KeywordsModule
  ]
})
export class AppModule {}
