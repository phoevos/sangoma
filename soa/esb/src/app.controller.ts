import { Body, Controller, Delete, Get, Headers, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('esb')
export class AppController {
  constructor( private readonly appService: AppService) { }

  @Get()
  async getRedirect(@Headers() headers, @Query() params) {
    const url = headers.url
    const config = { headers, params }
    const res = await this.appService.getRedirect(url, config);    
    return res.data
  }

  @Post()
  async postRedirect(@Body() body, @Headers() headers) {
    const url = headers.url
    const res = await this.appService.postRedirect(url, body, headers); 
    return res.data
  }

  @Patch()
  async patchRedirect(@Body() body, @Headers() headers) {
    const url = headers.url
    const res = await this.appService.patchRedirect(url, body, headers);
    return res.data
  }

  @Delete()
  async deleteRedirect(@Headers() headers) {
    const url = headers.url
    const res = await this.appService.deleteRedirect(url, headers);
    return res.data
  }
}
