import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = await this.entityManager.create(Answer, createAnswerDto)
    return this.entityManager.save(answer)
  }

  async findAll(): Promise<Answer[]> {
    return this.entityManager.find(Answer)
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.entityManager.findOne(Answer, id)
    if (!answer) throw new NotFoundException(`Answer #${id} not found`)
    return answer
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return this.entityManager.transaction(async manager => {
      const answer = await manager.findOne(Answer, id)
      if (!answer) throw new NotFoundException(`Answer #${id} not found`)
      manager.merge(Answer, answer, updateAnswerDto)
      return manager.save(answer)
    })
  }

  async remove(id: number): Promise<void> {
    return this.entityManager.transaction(async manager => {
      const answer = await manager.findOne(Answer, id)
      if (!answer) throw new NotFoundException(`Answer #${id} not found`)
      await manager.delete(Answer, id)
    })
  }
}
