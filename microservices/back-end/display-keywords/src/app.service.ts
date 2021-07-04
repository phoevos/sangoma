import { Injectable } from '@nestjs/common';
import { InjectEntityManager} from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager){}

  async findFilteredKeywords(filteredKeywordDto: FilteredKeywordDto) : Promise<any[]> {

    const { keywordPart, username } = filteredKeywordDto

    let query = this.entityManager.createQueryBuilder()
      .from(Keyword, "keyword")
      .select("keyword.keyword as keyword")
      .addSelect("COUNT(*) as freq")
      .innerJoin("keyword.questions", "question")
      .groupBy("keyword.keyword")
      .orderBy("freq", "DESC")
    if(keywordPart) query.andWhere("keyword.keyword LIKE(:keywordpart)", {keywordpart:`%${keywordPart}%`})
    if(username) query.andWhere(`question.username ='${username}' `)
    return query.getRawMany()
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
