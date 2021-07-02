import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { DiagramService } from './diagram.service';
import { ContributionsDto } from './dto/contributions.dto';

@Controller('diagram')
export class DiagramController {
  constructor(private readonly diagramService: DiagramService) {}



  @Get('/contributions/year')
  getContributionsByYear(@Query(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.diagramService.getContributionsByYear(contributionsDto)
  }

  @Get('/contributions/month')
  getContributionsByMonth(@Query(ValidationPipe) contributionsDto: ContributionsDto) {
    return this.diagramService.getContributionsByMonth(contributionsDto)
  }
}
