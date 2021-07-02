<<<<<<< HEAD
import { Controller, Get, Query, ValidationPipe} from '@nestjs/common';
import { FilteredKeywordDto } from './dto/get-filtered-keyword.dto';
import { AppService } from './app.service';

@Controller('qa/keywords')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  findFiltered(@Query(ValidationPipe) filteredKeywordDto: FilteredKeywordDto) {
    return this.appService.findFilteredKeywords(filteredKeywordDto);
=======
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
>>>>>>> a1ee6583e1172965526d1565f23f523e9d9b4428
  }
}
