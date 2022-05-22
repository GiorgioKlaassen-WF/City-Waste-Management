import { Component } from '@angular/core';
import { WebsocketService } from "./Services/websocket.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public collapsed: boolean = true;
  title = 'edge_device_frontend';

  private wssSub: Subscription;

  constructor(private wss: WebsocketService) {
    this.wssSub = this.wss.getMessage().subscribe((data) => {
      // can start displaying toast messages here
    })
  }

  ngOnInit(){
    this.collapsed = true;
  }

  ngOnDestroy() {
    this.wssSub.unsubscribe();
  }
}

