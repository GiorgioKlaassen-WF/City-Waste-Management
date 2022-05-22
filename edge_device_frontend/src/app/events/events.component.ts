import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../Services/websocket.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  messages = []
  private wssSub: Subscription;

  constructor(private wss: WebsocketService) {
    this.wssSub = this.wss.getMessage().subscribe((data) => {
      console.log(data)
    })
  }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    this.wssSub.unsubscribe();
  }

}
