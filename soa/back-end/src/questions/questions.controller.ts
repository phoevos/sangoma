import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {FilteredQuestionDto} from './dto/get-filtered-question.dto'
import { AuthGuard } from '@nestjs/passport';
import { ContributionsDto } from './dto/contributions.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findFiltered(@Query(ValidationPipe) filteredQuestionDto: FilteredQuestionDto) {
    return this.questionsService.findFilteredQuestions(filteredQuestionDto);
  }

  @Get('/contributions/year')
  getContributionsByYear(@Query(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.questionsService.getContributionsByYear(contributionsDto)
  }

  @Get('/contributions/month')
  getContributionsByMonth(@Query(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.questionsService.getContributionsByMonth(contributionsDto)
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.findOne(id)
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(id, updateQuestionDto)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(id)
  }
}
