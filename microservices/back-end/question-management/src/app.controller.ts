import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { User } from './auth/user.entity';

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
  }

  @MessagePattern('new_user')
  create_user(user: User) {
    return this.appService.create_user(user)
  }
}
