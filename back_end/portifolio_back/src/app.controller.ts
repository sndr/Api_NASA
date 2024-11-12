import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/testes')
  getTest(): string {
    return 'TESTANDO O BACK'
  }

  @Get('/helloworld')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('lua')
  getSearch(@Res() res: Response) {
    // Send the HTML response
    res.setHeader('Content-Type', 'text/html');
    res.send(this.appService.getLua());
  }
}
