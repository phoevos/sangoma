import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Answer } from 'src/qa_service/answers/entities/answer.entity';
import { Question } from 'src/qa_service/questions/entities/question.entity';
import { EntityManager } from 'typeorm';
import { ContributionsDto } from './dto/contributions.dto';

@Injectable()
export class DiagramService {
    constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}

    async getContributionsByYear(contributionsDto: ContributionsDto) {
        const { year, month, username } = contributionsDto
        const query = this.entityManager.createQueryBuilder(Question, "q")
        // BOTH WORK BEAUTIFULLY, STOP WHINING ABOUT THE QUERYBUILDER <3
        // return this.entityManager.query(`
        //     SELECT EXTRACT(MONTH FROM q."dateTime") AS month, COUNT(*) AS questions, a.answers
        //     FROM question AS q
        //     JOIN (
        //       SELECT EXTRACT(MONTH FROM ans."dateTime") AS month, COUNT(*) AS answers
        //       FROM answer AS ans
        //       WHERE username = '${username}' AND EXTRACT(YEAR FROM ans."dateTime") = ${year}
        //       GROUP BY EXTRACT(MONTH FROM ans."dateTime")
        //     ) AS a ON a.month = EXTRACT(MONTH FROM q."dateTime")
        //     WHERE username = '${username}' AND EXTRACT(YEAR FROM q."dateTime") = ${year}
        //     GROUP BY EXTRACT(MONTH FROM q."dateTime"), a.answers    
        //     ORDER BY "month" DESC
        // `)
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
}
