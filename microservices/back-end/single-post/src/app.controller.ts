<<<<<<< HEAD
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('qa')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('questions/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id)
  }

  @Post('answers')
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) createAnswerDto: CreateAnswerDto) {
    return this.appService.create(createAnswerDto)
  }

  @Patch('answers/:id')
  @UseGuards(AuthGuard())
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateAnswerDto: UpdateAnswerDto) {
    return this.appService.update(id, updateAnswerDto)
  }

  @Delete('answers/:id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.remove(id);
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
