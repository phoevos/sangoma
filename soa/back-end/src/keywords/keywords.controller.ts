import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  // @Post()
  // @UseGuards(AuthGuard())
  // create(@Body(ValidationPipe) createKeywordDto: CreateKeywordDto) {
  //   return this.keywordsService.create(createKeywordDto);
  // }

  @Get()
  findAll() {
    return this.keywordsService.findAll();
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
