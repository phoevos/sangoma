import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Answer } from 'src/qa_service/answers/entities/answer.entity';
import { Keyword } from 'src/qa_service/keywords/entities/keyword.entity';
import { Question } from 'src/qa_service/questions/entities/question.entity';
import { EntityManager } from 'typeorm';
import { ContributionsPerMonthDto } from './dto/contributionspermonth.dto';
import { ContributionsPerYearDto } from './dto/contributionsperyear.dto';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';

@Injectable()
export class DiagramService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) { }

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
          .where('ans.username = :username', { username })
          .andWhere('EXTRACT(YEAR FROM ans.dateTime) = :year', { year })
          .addGroupBy('EXTRACT(MONTH FROM ans.dateTime)'),
        'a', 'a.month = EXTRACT(MONTH FROM q.dateTime)')
      .where('q.username = :username', { username })
      .andWhere('EXTRACT(YEAR FROM q.dateTime) = :year', { year })
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
          .where('ans.username = :username', { username })
          .andWhere('EXTRACT(YEAR FROM ans.dateTime) = :year', { year })
          .andWhere('EXTRACT(MONTH FROM ans.dateTime) = :month', { month })
          .addGroupBy('EXTRACT(DAY FROM ans.dateTime)'),
        'a', 'a.day = EXTRACT(DAY FROM q.dateTime)')
      .where('q.username = :username', { username })
      .andWhere('EXTRACT(YEAR FROM q.dateTime) = :year', { year })
      .andWhere('EXTRACT(MONTH FROM q.dateTime) = :month', { month })
      .addGroupBy('EXTRACT(DAY FROM q.dateTime)')
      .addGroupBy('a.answers')
      .getRawMany()
  }


  async findFilteredKeywords(filteredKeywordDto: FilteredKeywordDto): Promise<any[]> {

    const { keywordPart, username } = filteredKeywordDto

    let query = this.entityManager.createQueryBuilder()
      .from(Keyword, "keyword")
      .select("keyword.keyword as keyword")
      .addSelect("COUNT(*) as freq")
      .innerJoin("keyword.questions", "question")
      .groupBy("keyword.keyword")
      .orderBy("freq", "DESC")
    if (keywordPart) query.andWhere("keyword.keyword LIKE(:keywordpart)", { keywordpart: `%${keywordPart}%` })
    if (username) query.andWhere(`question.username ='${username}' `)
    return query.getRawMany()
  }
}
