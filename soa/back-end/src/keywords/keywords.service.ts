import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager} from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';

@Injectable()
export class KeywordsService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager){}

  async findAll()  : Promise<Keyword[]> {
    return this.entityManager.find(Keyword)
  }
  async findFilteredKeywords(filteredKeywordDto: FilteredKeywordDto) : Promise<any[]> {

    const {keywordPart} = filteredKeywordDto

    let query = this.entityManager.createQueryBuilder()
      .from(Keyword,"keyword")
      .select("keyword.keyword as keyword")
      .addSelect("COUNT(*) as freq")
      .innerJoin("keyword.questions", "question")
      .groupBy("keyword.keyword")
      .orderBy("freq", "DESC")
    if(keywordPart) query.andWhere("keyword.keyword LIKE(:keywordpart)",{keywordpart:`%${keywordPart}%`})

    return query.getRawMany()
  }
  async findOne(keyword: string) : Promise<Keyword>{
    const thekeyword = await this.entityManager.findOne(Keyword, keyword)
    if (!thekeyword) throw new NotFoundException(`Keyword #${keyword} not found`)
    return thekeyword
  }

  // update(id: number, updateKeywordDto: UpdateKeywordDto) {
  //   return `This action updates a #${id} keyword`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} keyword`;
  // }
}
