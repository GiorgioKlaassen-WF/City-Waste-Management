import { Injectable } from '@angular/core';
import { map, Observable, Subscription } from "rxjs";
import { Socket } from "ngx-socket-io";

const WebSocketServer = "ws://139-162-139-209.ip.linodeusercontent.com";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private socket: Socket) {
  }

  getMessage() : Observable<any>{
    // @ts-ignore
    return this.socket.fromEvent('connection').pipe(map((data) => data));
  }

  getLogs(): any {
    return this.socket.fromEvent('logs').pipe(map((data) => data));
  }


}
