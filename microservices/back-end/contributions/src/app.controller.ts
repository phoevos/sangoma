import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ContributionsDto } from './dto/contributions.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Controller('diagram/contributions')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('year')
  getContributionsByYear(@Query(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.appService.getContributionsByYear(contributionsDto)
  }
  
  @Get('month')
  getContributionsByMonth(@Query(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.appService.getContributionsByMonth(contributionsDto)
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
  remove_question(deleteQuestionDto) {
    return this.appService.remove_question(deleteQuestionDto)
  }
  
  @MessagePattern('create_answer')
  create_answer(createAnswerDto: Answer) {
    return this.appService.create_answer(createAnswerDto);
  }

  @MessagePattern('update_answer')
  update_answer(updateAnswerDto: Answer) {
    return this.appService.update_answer(updateAnswerDto)
  }

  @MessagePattern('delete_answer')
  remove_answer(deleteAnswerDto) {
    return this.appService.remove_answer(deleteAnswerDto)
  }
}
