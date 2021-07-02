import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager} from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';

@Injectable()
export class KeywordsService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager){}

  async findFilteredKeywords(filteredKeywordDto: FilteredKeywordDto) : Promise<any[]> {

    const {keywordPart,username} = filteredKeywordDto

    let query = this.entityManager.createQueryBuilder()
      .from(Keyword,"keyword")
      .select("keyword.keyword as keyword")
      .addSelect("COUNT(*) as freq")
      .innerJoin("keyword.questions", "question")
      .groupBy("keyword.keyword")
      .orderBy("freq", "DESC")
    if(keywordPart) query.andWhere("keyword.keyword LIKE(:keywordpart)",{keywordpart:`%${keywordPart}%`})
    if(username) query.andWhere(`question.username ='${username}' `)
    return query.getRawMany()
  }

  async findOne(keyword: string) : Promise<Keyword>{
    const thekeyword = await this.entityManager.findOne(Keyword, keyword)
    if (!thekeyword) throw new NotFoundException(`Keyword #${keyword} not found`)
    return thekeyword
  }
}
