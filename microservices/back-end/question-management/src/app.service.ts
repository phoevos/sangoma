import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { User } from './auth/user.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('QUESTION_SERVICE') private readonly clientProxy: ClientProxy,
    @InjectEntityManager() private userManager: EntityManager,
    @InjectEntityManager('questions') private entityManager: EntityManager
    ) {}
  
  async create(createQuestionDto: CreateQuestionDto){
    let question = this.entityManager.create(Question, createQuestionDto)
    question = await this.entityManager.save(question)
    this.clientProxy.emit('create_question', question)
    return question
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return this.entityManager.transaction(async manager => {
      let question = await manager.findOne(Question, id, { relations: ['answers']})
      if (!question) throw new NotFoundException(`Question #${id} not found`)
      manager.merge(Question, question, updateQuestionDto)
      question = await manager.save(question)
      this.clientProxy.emit('update_question', question)
      return question
    })
  }

  async remove(id: number): Promise<void> {
    return this.entityManager.transaction(async manager => {
      const question = await manager.findOne(Question, id)
      if (!question) throw new NotFoundException(`Question #${id} not found`)
      await manager.remove(question)
      this.clientProxy.emit('delete_question', question)
    })
  }

  async create_user(userDto) {
    const user = this.userManager.create(User, userDto)
    return this.userManager.save(user)
  }
}
