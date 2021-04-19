import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto)
  }

  @Get()
  findAll() {
    return this.answersService.findAll()
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
