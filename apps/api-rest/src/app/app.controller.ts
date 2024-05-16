import { Controller, Get, MessageEvent, Sse } from '@nestjs/common';

import { AppService } from './app.service';
import { Observable, interval, map } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(10000).pipe(map(() => ({ data: { hello: 'world' } })));
  }
}
