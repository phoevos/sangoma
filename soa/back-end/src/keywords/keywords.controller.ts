import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ValidationPipe} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  // @Get()
  // findAll() {
  //   return this.keywordsService.findAll();
  // }

  // @Get('/filtered')
  @Get()
  findFiltered(@Query(ValidationPipe) filteredKeywordDto: FilteredKeywordDto) {
    return this.keywordsService.findFilteredKeywords(filteredKeywordDto);
  }

  @Get('/:keyword')
  findOne(@Param('keyword', ParseIntPipe) keyword: string) {
    return this.keywordsService.findOne(keyword);
  }

  // @Patch('/:id')
  // update(@Param('id') id: number, @Body() updateKeywordDto: UpdateKeywordDto) {
  //   return this.keywordsService.update(id, updateKeywordDto);
  // }

  // @Delete('/:id')
  // remove(@Param('id') id: number) {
  //   return this.keywordsService.remove(id);
  // }
}
