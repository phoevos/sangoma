import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
    @Inject('ANSWER_SERVICE') private readonly clientProxy: ClientProxy,
    @InjectEntityManager() private userManager: EntityManager,
    @InjectEntityManager('questions') private entityManager: EntityManager
    ) {}

  async findOne(id: number): Promise<Question> {
    const question = await this.entityManager.findOne(Question, id, { relations: ['answers', 'keywords']})
    if (!question) throw new NotFoundException(`Question #${id} not found`)
    return question
  }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    let answer = await this.entityManager.create(Answer, createAnswerDto)
    answer = await this.entityManager.save(answer)
    this.clientProxy.emit('create_answer', answer)
    return answer
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    return this.entityManager.transaction(async manager => {
      let answer = await manager.findOne(Answer, id)
      if (!answer) throw new NotFoundException(`Answer #${id} not found`)
      manager.merge(Answer, answer, updateAnswerDto)
      answer = await manager.save(answer)
      this.clientProxy.emit('update_answer', answer)
      return answer
    })
  }

  async remove(id: number): Promise<void> {
    return this.entityManager.transaction(async manager => {
      const answer = await manager.findOne(Answer, id)
      if (!answer) throw new NotFoundException(`Answer #${id} not found`)
      await manager.delete(Answer, id)
      this.clientProxy.emit('delete_answer', answer)
    })
  }

  async create_user(userDto) {
    const user = this.userManager.create(User, userDto)
    return this.userManager.save(user)
  }

  async create_question(question: Question){
    question = this.entityManager.create(Question, question)
    return this.entityManager.save(question)
  }

  async update_question(question: Question) : Promise<Question> {
    question = this.entityManager.create(Question, question)
    return this.entityManager.save(question)
  }

  async remove_question(question): Promise<void> {
    question = this.entityManager.create(Question, question)
    return this.entityManager.remove(question)
  }
}
