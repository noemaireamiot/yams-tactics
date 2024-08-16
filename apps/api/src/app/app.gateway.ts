import {
  MessageBody,
  SubscribeMessage,
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import WebSocket, { WebSocketServer as WebSocketServerT } from 'ws';

import { AppService } from './app.service';

@WebSocketGateway(Number(process.env.API_WS_PORT), {})
export class AppGateway {
  @WebSocketServer()
  private server: WebSocketServerT;

  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('events')
  handleEvent(
    @ConnectedSocket() socket: WebSocket,
    @MessageBody() data: string
  ): string {
    console.info('on events', data);
    console.info(this.server.clients.size, 'clients connected');

    this.server.clients.forEach((client) => client.send('Hello world'));

    return data;
  }
}
