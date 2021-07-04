import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FilteredQuestionDto } from './dto/get-filtered-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
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
  
  async create(question: Question){
    question = this.entityManager.create(Question, question)
    return this.entityManager.save(question)
  }

  async update(question: Question) : Promise<Question> {
    question = this.entityManager.create(Question, question)
    return this.entityManager.save(question)
  }

  async remove(question): Promise<void> {
    question = this.entityManager.create(Question, question)
    return this.entityManager.remove(question)
  }
}
