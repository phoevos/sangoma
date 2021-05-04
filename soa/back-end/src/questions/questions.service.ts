import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Between, EntityManager, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { FilteredQuestionDto } from './dto/get-filtered-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import {Like} from "typeorm";
@Injectable()
export class QuestionsService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = await this.entityManager.create(Question, createQuestionDto)
    return this.entityManager.save(question)
  }

  async findAll(): Promise<Question[]> {
    return this.entityManager.find(Question, {
      order: {
        dateTime: 'DESC'
      }
    })
  }

  async findFilteredQuestions(filteredQuestionDto: FilteredQuestionDto): Promise<Question[]> {


    const dateFilter = (startDate,endDate)=>{
      if(startDate && endDate){
        return {dateTime: Between(startDate,endDate)}
      }
      else if(startDate && !endDate) {
        return {dateTime: MoreThanOrEqual(startDate)}
      }
      else if(!startDate && endDate) {
        return {dateTime: LessThanOrEqual(startDate)}
      }
      else return
    }

    const {titlePart,startDate,endDate,username,matchingKeywords} = filteredQuestionDto

    return this.entityManager.find(Question, {
      order: {
        dateTime: 'DESC'
      },
      relations: ["keywords"] ,
      where:{
            ...(titlePart &&{title: Like("%"+titlePart+"%")}),
            ...dateFilter(startDate,endDate),
            ...(username && {username : username})}
    })
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.entityManager.findOne(Question, id, { relations: ['answers']})
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
      await manager.delete(Question, id)
    })
  }
}
