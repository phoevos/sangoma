import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './auth/user.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private userManager: EntityManager,
    @InjectEntityManager('questions') private entityManager: EntityManager
    ) {}

  async findOne(id: number): Promise<Question> {
    const question = await this.entityManager.findOne(Question, id, { relations: ['answers', 'keywords']})
    if (!question) throw new NotFoundException(`Question #${id} not found`)
    return question
  }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = await this.entityManager.create(Answer, createAnswerDto)
    return this.entityManager.save(answer)
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

  async create_user(userDto) {
    const user = this.userManager.create(User, userDto)
    return this.userManager.save(user)
  }
}
