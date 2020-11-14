import { Controller, Get, Render, Res, Sse, MessageEvent } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @Render('index')
  // root() {
  //   return { message: 'Hello world!' };
  // }
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
