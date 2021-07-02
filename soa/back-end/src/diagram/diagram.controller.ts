import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { DiagramService } from './diagram.service';
import { ContributionsDto } from './dto/contributions.dto';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';

@Controller('diagram')
export class DiagramController {
  constructor(private readonly diagramService: DiagramService) {}

  @Post('/filtered_keywords')
  findFiltered(@Body(ValidationPipe) filteredKeywordDto: FilteredKeywordDto) {
    return this.diagramService.findFilteredKeywords(filteredKeywordDto);
  }

  @Post('/contributions/year')
  getContributionsByYear(@Body(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.diagramService.getContributionsByYear(contributionsDto)
  }

  @Post('/contributions/month')
  getContributionsByMonth(@Body(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.diagramService.getContributionsByMonth(contributionsDto)
  }
}
