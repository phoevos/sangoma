import { Controller, Get, Query, ValidationPipe} from '@nestjs/common';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Question } from './entities/question.entity';

@Controller('qa/keywords')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('filtered')
  findFiltered(@Query(ValidationPipe) filteredKeywordDto: FilteredKeywordDto) {
    return this.appService.findFilteredKeywords(filteredKeywordDto);
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
