import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('esb')
export class AppController {
  constructor( private readonly appService: AppService) { }

  @Get('/service_discovery')
  async getServices(){
    return this.appService.getServices()
  }

  @Get('/endpoint_discovery/:id')
  async getEndpoints(@Param('id', ParseIntPipe) id: number){
    return this.appService.getEndpoints(id)
  } 

  @Get()
  async getRedirect(@Headers() headers, @Query() params, @Res() response: Response) {
    const url = headers.url
    const config = { params }
    try {
      const res = await this.appService.getRedirect(url, config);    
      response.status(res.status).send(res.data)
    }
    catch(err) {
      response.status(err.response.data.statusCode).send(err.response.data.message)
    }
  }

  @Post()
  async postRedirect(@Body() body, @Headers() headers, @Res() response: Response) {
    const url = headers.url
    try {
      const res = await this.appService.postRedirect(url, body, headers); 
      response.status(res.status).send(res.data)
    }
    catch (err) {
      response.status(err.response.data.statusCode).send(err.response.data.message)
    }
  }

  @Patch()
  async patchRedirect(@Body() body, @Headers() headers, @Res() response: Response) {
    const url = headers.url
    try {
      const res = await this.appService.patchRedirect(url, body, headers);
      response.status(res.status).send(res.data)
    }
    catch(err) {
      response.status(err.response.data.statusCode).send(err.response.data.message)
    }
  }

  @Delete()
  async deleteRedirect(@Headers() headers, @Res() response: Response) {
    const url = headers.url
    try {
      const res = await this.appService.deleteRedirect(url, headers);
      response.status(res.status).send(res.data)
    }
    catch(err) {
      response.status(err.response.data.statusCode).send(err.response.data.message)
    }
  }
}
