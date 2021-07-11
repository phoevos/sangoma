import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { User } from './auth/user.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Question } from './entities/question.entity';

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

  @MessagePattern('new_user')
  create_user(user: User) {
    return this.appService.create_user(user)
  }

  @MessagePattern('create_question')
  create_question(createQuestionDto: Question) {
    return this.appService.create_question(createQuestionDto);
  }

  @MessagePattern('update_question')
  update_question(updateQuestionDto: Question) {
    return this.appService.update_question(updateQuestionDto)
  }

  @MessagePattern('delete_question')
  remove_question(deleteQuestionDto: Question) {
    return this.appService.remove_question(deleteQuestionDto)
  }
}
