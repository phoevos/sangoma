import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Between, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FilteredQuestionDto } from './dto/get-filtered-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ContributionsDto } from './dto/contributions.dto';
import { Question } from './entities/question.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { Keyword } from 'src/keywords/entities/keyword.entity';


@Injectable()
export class QuestionsService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto){
    const question = this.entityManager.create(Question, createQuestionDto)
    // for (let keyword of createQuestionDto.keywords) {
    //   let thekeyword = this.entityManager.create(Keyword, keyword)
    //   this.entityManager.save(thekeyword)
    // }
    return this.entityManager.save(question)
  }

  async findAll(): Promise<Question[]> {
    return this.entityManager.find(Question, {
      order: {
        dateTime: 'DESC'
      }
    })
  }

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

  async findFilteredQuestions(filteredQuestionDto: FilteredQuestionDto): Promise<Question[]> {

    const {titlePart,startDate,endDate,username,matchingKeywords} = filteredQuestionDto
    let matchingKeywordsArray
    const query = this.entityManager.createQueryBuilder(Question,"question")

                               /*  Optimised sql implementation : url -- https://www.slideshare.net/billkarwin/sql-query-patterns-optimized */

    if(matchingKeywords){
      if (typeof matchingKeywords === 'string' || matchingKeywords instanceof String)
        matchingKeywordsArray = [].concat(matchingKeywords)
      else 
        matchingKeywordsArray = matchingKeywords

      for (let i = 0; i < matchingKeywordsArray.length; i++)
        query.innerJoin("question.keywords",`keyword${i}`, `keyword${i}.keyword = :matchingkeyword`, { matchingkeyword: matchingKeywordsArray[i] })
    }
    if(username)  query.andWhere("question.username = :username", {username}) 
    if(startDate) query.andWhere("question.dateTime >= :startDate", {startDate})
    if(endDate)   query.andWhere("question.dateTime <= :endDate", {endDate})
    if(titlePart) query.andWhere("question.title LIKE(:titlepart)",{titlepart:`%${titlePart}%`})

    query.leftJoinAndSelect("question.keywords","keyword")
    query.orderBy("question.dateTime","DESC")
    return query.getMany();

                                          /* Implementation with group by . Unable to return keyword list */
    // if(matchingKeywords){
    //   query.innerJoinAndSelect("question.keywords","keyword")

    //   query.andWhere(`"keywordId" IN (${matchingKeywords.toString()})`)
    // }
    // if(username)  query.andWhere("question.username = :username", {username}) 
    // if(startDate) query.andWhere("question.dateTime >= :startDate", {startDate})
    // if(endDate)   query.andWhere("question.dateTime <= :endDate", {endDate})
    // if(titlePart) query.andWhere("question.title LIKE(:titlepart)",{titlepart:`%${titlePart}%`})
    // if(matchingKeywords){
    //   query.groupBy("question.id")
    //   query.having(`COUNT(DISTINCT "question_keyword"."keywordId")= ${matchingKeywords.length}`)
    // }


                                              /* Older implementation (find) without keyword filtering*/
    // const dateFilter = (startDate,endDate)=>{
    //   if(startDate && endDate){
    //     return {dateTime: Between(startDate,endDate)}
    //   }
    //   else if(startDate && !endDate) {
    //     return {dateTime: MoreThanOrEqual(startDate)}
    //   }
    //   else if(!startDate && endDate) {
    //     return {dateTime: LessThanOrEqual(startDate)}
    //   }
    //   else return
    // }


    // return this.entityManager.find(Question, {
    //   order: {
    //     dateTime: 'DESC'
    //   },
    //   relations: ["keywords"] ,
      
    //   where:{
    //         ...(titlePart &&{title: Like("%"+titlePart+"%")}),
    //         ...dateFilter(startDate,endDate),
    //         ...(username && {username : username})}
    // })


  }

  async findOne(id: number): Promise<Question> {
    const question = await this.entityManager.findOne(Question, id, { relations: ['answers', 'keywords']})
    if (!question) throw new NotFoundException(`Question #${id} not found`)
    return question
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return this.entityManager.transaction(async manager => {
      const question = await manager.findOne(Question, id, { relations: ['answers']})
      if (!question) throw new NotFoundException(`Question #${id} not found`)
      manager.merge(Question, question, updateQuestionDto)
      return manager.save(question)
    })
  }

  async remove(id: number): Promise<void> {
    return this.entityManager.transaction(async manager => {
      const question = await manager.findOne(Question, id)
      if (!question) throw new NotFoundException(`Question #${id} not found`)
      await manager.remove(question)
      // await manager.delete(Question, id)
    })
  }
}
