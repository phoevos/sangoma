import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ContributionsDto } from './dto/contributions.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}
  
  async getContributionsByYear(contributionsDto: ContributionsDto) {
    const { year, month, username } = contributionsDto
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
    
    async getContributionsByMonth(contributionsDto: ContributionsDto) {
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
    
      // async create(createQuestionDto: CreateQuestionDto){
      //   const question = this.entityManager.create(Question, createQuestionDto)
      //   return this.entityManager.save(question)
      // }
      
      // async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
        //   return this.entityManager.transaction(async manager => {
          //     const question = await manager.findOne(Question, id, { relations: ['answers']})
          //     if (!question) throw new NotFoundException(`Question #${id} not found`)
          //     manager.merge(Question, question, updateQuestionDto)
  //     return manager.save(question)
  //   })
  // }

  // async remove(id: number): Promise<void> {
  //   return this.entityManager.transaction(async manager => {
  //     const question = await manager.findOne(Question, id)
  //     if (!question) throw new NotFoundException(`Question #${id} not found`)
  //     await manager.remove(question)
  //   })
  // }
}
