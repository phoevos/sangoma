import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ContributionsPerMonthDto } from './dto/contributionspermonth.dto';
import { ContributionsPerYearDto } from './dto/contributionsperyear.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}
  
  async getContributionsByYear(contributionsDto: ContributionsPerYearDto) {
    const { year, username } = contributionsDto
    const query = this.entityManager.createQueryBuilder(Question, "q")
    return query.select('EXTRACT(MONTH FROM q.dateTime)', 'month')
    .addSelect('COUNT(*)', 'questions')
    .addSelect('a.answers', 'answers')
    .leftJoin(subquery => 
      subquery
      .select('EXTRACT(MONTH FROM ans.dateTime)', 'month')
      .addSelect('COUNT(*)', 'answers')
      .addFrom(Answer, 'ans')
      .where('ans.username = :username', {username})
      .andWhere('EXTRACT(YEAR FROM ans.dateTime) = :year', {year})
      .addGroupBy('EXTRACT(MONTH FROM ans.dateTime)'), 
      'a', 'a.month = EXTRACT(MONTH FROM q.dateTime)')
      .where('q.username = :username', {username})
      .andWhere('EXTRACT(YEAR FROM q.dateTime) = :year', {year})
      .addGroupBy('EXTRACT(MONTH FROM q.dateTime)')
      .addGroupBy('a.answers')
      .getRawMany()
    }
    
    async getContributionsByMonth(contributionsDto: ContributionsPerMonthDto) {
      const { year, month, username } = contributionsDto
      const query = this.entityManager.createQueryBuilder(Question, "q")
      return query.select('EXTRACT(DAY FROM q.dateTime)', 'day')
      .addSelect('COUNT(*)', 'questions')
      .addSelect('a.answers', 'answers')
      .leftJoin(subquery => 
        subquery
        .select('EXTRACT(DAY FROM ans.dateTime)', 'day')
        .addSelect('COUNT(*)', 'answers')
        .addFrom(Answer, 'ans')
        .where('ans.username = :username', {username})
        .andWhere('EXTRACT(YEAR FROM ans.dateTime) = :year', {year})
        .andWhere('EXTRACT(MONTH FROM ans.dateTime) = :month', {month})
        .addGroupBy('EXTRACT(DAY FROM ans.dateTime)'), 
        'a', 'a.day = EXTRACT(DAY FROM q.dateTime)')
        .where('q.username = :username', {username})
        .andWhere('EXTRACT(YEAR FROM q.dateTime) = :year', {year})
        .andWhere('EXTRACT(MONTH FROM q.dateTime) = :month', {month})
        .addGroupBy('EXTRACT(DAY FROM q.dateTime)')
        .addGroupBy('a.answers')
        .getRawMany()
      }

      async create_question(question: Question) : Promise<Question> {
        question = this.entityManager.create(Question, question)
        return this.entityManager.save(question)
      }
    
      async update_question(question: Question) : Promise<Question> {
        question = this.entityManager.create(Question, question)
        return this.entityManager.save(question)
      }
    
      async remove_question(question): Promise<void> {
        question = this.entityManager.create(Question, question)
        return this.entityManager.remove(question)
      }
      
    async create_answer(answer: Answer){
      answer = this.entityManager.create(Answer, answer)
      return this.entityManager.save(answer)
    }
  
    async update_answer(answer: Answer) : Promise<Answer> {
      answer = this.entityManager.create(Answer, answer)
      return this.entityManager.save(answer)
    }
  
    async remove_answer(answer): Promise<void> {
      answer = this.entityManager.create(Answer, answer)
      return this.entityManager.remove(answer)
    }
}
