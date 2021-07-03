import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { FilteredQuestionDto } from './dto/get-filtered-question.dto';

@Controller('qa/questions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('filtered')
  findFiltered(@Query(ValidationPipe) filteredQuestionDto: FilteredQuestionDto) {
    return this.appService.findFilteredQuestions(filteredQuestionDto);
  }

  // @Post()
  // @UseGuards(AuthGuard())
  // create(@Body(ValidationPipe) createQuestionDto: CreateQuestionDto) {
  //   return this.appService.create(createQuestionDto);
  // }

  // @Patch('/:id')
  // @UseGuards(AuthGuard())
  // update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQuestionDto: UpdateQuestionDto) {
  //   return this.appService.update(id, updateQuestionDto)
  // }

  // @Delete('/:id')
  // @UseGuards(AuthGuard())
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.appService.remove(id)
  // }
}
