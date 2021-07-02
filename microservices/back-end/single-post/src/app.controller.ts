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
  }
}
