import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../Services/websocket.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private wss: WebsocketService) {

  }

  ngOnInit(): void {

  }
  ngOnDestroy() {
  }

}
