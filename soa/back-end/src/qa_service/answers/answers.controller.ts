import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { FilteredAnswerDto } from './dto/get-filtered-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('qa/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto)
  }

  @Post('/filtered')
  findAll(@Body(ValidationPipe) filteredAnswerDto: FilteredAnswerDto) {
    return this.answersService.findAll(filteredAnswerDto)
  }
 
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.findOne(id)
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.remove(id);
  }
}
