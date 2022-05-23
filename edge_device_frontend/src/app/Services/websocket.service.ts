import { Injectable } from '@angular/core';
import { map, Subscription } from "rxjs";
import { Socket } from "ngx-socket-io";


const WebSocketServer = "ws://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private socket: Socket) {
  }

  getMessage() {
    return this.socket.fromEvent('connection').pipe(map((data) => data));
  }

  getLogs(): any {
    return this.socket.fromEvent('logs').pipe(map((data) => data));
  }


}
