import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { InjectEntityManager} from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager){}

  async findFilteredKeywords(filteredKeywordDto: FilteredKeywordDto) : Promise<any[]> {

    const { keywordPart, username } = filteredKeywordDto

    let query = this.entityManager.createQueryBuilder()
      .from(Keyword,"keyword")
      .select("keyword.keyword as keyword")
      .addSelect("COUNT(*) as freq")
      .innerJoin("keyword.questions", "question")
      .groupBy("keyword.keyword")
      .orderBy("freq", "DESC")
    if(keywordPart) query.andWhere("keyword.keyword LIKE(:keywordpart)", {keywordpart:`%${keywordPart}%`})
    if(username) query.andWhere(`question.username ='${username}' `)
    return query.getRawMany()
=======

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
  }
}
