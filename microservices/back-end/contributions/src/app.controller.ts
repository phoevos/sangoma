import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ContributionsDto } from './dto/contributions.dto';

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
