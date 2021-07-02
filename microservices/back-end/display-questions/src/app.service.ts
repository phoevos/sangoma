import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { FilteredQuestionDto } from './dto/get-filtered-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}
  
  async findFilteredQuestions(filteredQuestionDto: FilteredQuestionDto): Promise<Question[]> {
    
    const { titlePart, startDate, endDate, username, matchingKeywords } = filteredQuestionDto
    let matchingKeywordsArray
    const query = this.entityManager.createQueryBuilder(Question, "question")
    
    if(matchingKeywords){
      if (typeof matchingKeywords === 'string' || matchingKeywords instanceof String)
        matchingKeywordsArray = [].concat(matchingKeywords)
      else 
        matchingKeywordsArray = matchingKeywords
      for (let i = 0; i < matchingKeywordsArray.length; i++){
        query.innerJoin("question.keywords", `keyword${i}`, `keyword${i}.keyword = '${matchingKeywordsArray[i]}'`)
      }
    }
    if(username)  query.andWhere("question.username = :username", {username}) 
    if(startDate) query.andWhere("question.dateTime >= :startDate", {startDate})
    if(endDate)   query.andWhere("question.dateTime <= :endDate", {endDate})
    if(titlePart) query.andWhere("question.title LIKE(:titlepart)", {titlepart:`%${titlePart}%`})
    
    query.leftJoinAndSelect("question.keywords", "keyword")
    query.orderBy("question.dateTime", "DESC")
    return query.getMany()
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
