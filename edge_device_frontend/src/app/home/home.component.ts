import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { WebsocketService } from "../Services/websocket.service";
import { Subscription } from "rxjs";

interface IinfoArray {
  text: string,
  title: string,
  iconShape: string,
  icon: any,
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private wssSub: Subscription | undefined;
  public status: any;
  public infoArray!: [IinfoArray];
  public connectionCount: number = 0;


  constructor(private wss: WebsocketService) {
    this.wssSub = this.wss.getMessage().subscribe((data) => {
      // @ts-ignore
      this.connectionCount = data.connectionCount
      this.status = data
      this.setInfoCards()
    })
  }

  ngOnInit(): void {


  }

  ngOnDestroy() {
    // @ts-ignore
    this.wssSub.unsubscribe();
  }

  setInfoCards() {
    this.infoArray = [{
      text: `Welkom `,
      title: 'Welkom user',
      iconShape: 'user',
      icon: 'true',
    }]
    this.infoArray.push({
        text: `Users currently using this application: ${this.connectionCount}`,
        title: 'Connected',
        iconShape: 'wifi',
        icon: 'true',
      })
    this.infoArray.push({
      text: `Server message: ${this.status.msg}`,
      title: 'Message',
      iconShape: 'rack-server',
      icon: 'true',
    })
  }

}
