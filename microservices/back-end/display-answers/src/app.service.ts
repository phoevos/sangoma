import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { FilteredAnswerDto } from './dto/get-filtered-answer.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager) {}
  
    async findAll(filteredAnswerDto: FilteredAnswerDto): Promise<Answer[]> {
      const { username } = filteredAnswerDto
      const query = this.entityManager.createQueryBuilder(Answer, 'answer')
      if(username) {
        query.andWhere("answer.username = :username", {username})
        query.leftJoin("answer.question","q").select(['answer.id', 'answer.username', 'answer.text', 'answer.dateTime', 'q.title', 'q.id'])
        query.orderBy("answer.dateTime", "DESC")
        return query.getMany();
      }
      return this.entityManager.find(Answer, {username})
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

    async create_answer(answer: Answer){
      answer = this.entityManager.create(Answer, answer)
      return this.entityManager.save(answer)
    }
  
    async update_answer(answer: Answer) : Promise<Answer> {
      answer = this.entityManager.create(Answer, answer)
      return this.entityManager.save(answer)
    }
  
    async remove_answer(answer): Promise<void> {
      answer = this.entityManager.create(Answer, answer)
      return this.entityManager.remove(answer)
    }
}
