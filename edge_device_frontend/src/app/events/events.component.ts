import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../Services/websocket.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  private wssSub: Subscription | undefined;
  // @ts-ignore
  logs: [any] | undefined = []

  constructor(private wss: WebsocketService) {
    // @ts-ignore
    this.wssSub = this.wss.getLogs().subscribe((data) => {
      // @ts-ignore
      this.logs?.push(data.sensorReading);
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    // @ts-ignore
    this.wssSub.unsubscribe();
  }

}
