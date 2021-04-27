import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { EntityManager } from 'typeorm';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';

@Injectable()
export class KeywordsService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager){}

  create(createKeywordDto: CreateKeywordDto) {
    return 'This action adds a new keyword';
  }

  findAll() {
    return "This action returns all keywords."
  }

  findOne(id: number) {
    return `This action returns a #${id} keyword`;
  }

  update(id: number, updateKeywordDto: UpdateKeywordDto) {
    return `This action updates a #${id} keyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyword`;
  }
}
