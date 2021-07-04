import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { FilteredQuestionDto } from './dto/get-filtered-question.dto';
import { Question } from './entities/question.entity';

@Controller('qa/questions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('filtered')
  findFiltered(@Query(ValidationPipe) filteredQuestionDto: FilteredQuestionDto) {
    return this.appService.findFilteredQuestions(filteredQuestionDto);
  }

  @MessagePattern('create_question')
  create(createQuestionDto: Question) {
    return this.appService.create(createQuestionDto);
  }

  @MessagePattern('update_question')
  update(updateQuestionDto: Question) {
    return this.appService.update(updateQuestionDto)
  }

  @MessagePattern('delete_question')
  remove(deleteQuestionDto) {
    return this.appService.remove(deleteQuestionDto)
  }
}
