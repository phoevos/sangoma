import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}
  
  async create(createQuestionDto: CreateQuestionDto){
    const question = this.entityManager.create(Question, createQuestionDto)
    return this.entityManager.save(question)
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
    })
  }
}
