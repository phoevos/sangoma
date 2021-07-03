import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { FilteredAnswerDto } from './dto/get-filtered-answer.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('qa/answers')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('filtered')
  findAll(@Query(ValidationPipe) filteredAnswerDto: FilteredAnswerDto) {
    return this.appService.findAll(filteredAnswerDto)
  }

  // @Post('answers')
  // @UseGuards(AuthGuard())
  // create(@Body(ValidationPipe) createAnswerDto: CreateAnswerDto) {
  //   return this.appService.create(createAnswerDto)
  // }

  // @Patch('answers/:id')
  // @UseGuards(AuthGuard())
  // update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateAnswerDto: UpdateAnswerDto) {
  //   return this.appService.update(id, updateAnswerDto)
  // }

  // @Delete('answers/:id')
  // @UseGuards(AuthGuard())
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.appService.remove(id);
  // }
}
