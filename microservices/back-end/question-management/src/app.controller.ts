<<<<<<< HEAD
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('qa/questions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) createQuestionDto: CreateQuestionDto) {
    return this.appService.create(createQuestionDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQuestionDto: UpdateQuestionDto) {
    return this.appService.update(id, updateQuestionDto)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.remove(id)
=======
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
  }
}
