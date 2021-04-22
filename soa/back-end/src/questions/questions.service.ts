import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

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
