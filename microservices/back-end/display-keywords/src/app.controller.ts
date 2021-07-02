import { Controller, Get, Query, ValidationPipe} from '@nestjs/common';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';
import { AppService } from './app.service';

@Controller('qa/keywords')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  findFiltered(@Query(ValidationPipe) filteredKeywordDto: FilteredKeywordDto) {
    return this.appService.findFilteredKeywords(filteredKeywordDto);
  }
}
