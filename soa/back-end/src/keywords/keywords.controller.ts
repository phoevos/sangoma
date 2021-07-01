import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ValidationPipe} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';

@Controller('qa/keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}
  @Get()
  findFiltered(@Query(ValidationPipe) filteredKeywordDto: FilteredKeywordDto) {
    return this.keywordsService.findFilteredKeywords(filteredKeywordDto);
  }

  @Get('/:keyword')
  findOne(@Param('keyword', ParseIntPipe) keyword: string) {
    return this.keywordsService.findOne(keyword);
  }
}
