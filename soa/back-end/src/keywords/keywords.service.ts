import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager} from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';

@Injectable()
export class KeywordsService {
  constructor(@InjectEntityManager('questions') private entityManager: EntityManager){}

  // async create(createKeywordDto: CreateKeywordDto) : Promise<Keyword>{
  //   const keyword = await this.entityManager.create(Keyword, createKeywordDto)
  //   return this.entityManager.save(keyword)
  // }

  async findAll()  : Promise<Keyword[]> {
    return this.entityManager.find(Keyword)
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
