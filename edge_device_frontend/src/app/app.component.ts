import { Component } from '@angular/core';
import { WebsocketService } from "./Services/websocket.service";
import { Subscription } from "rxjs";
import { Toast, ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public collapsed: boolean = true;
  title = 'edge_device_frontend';

  private wssSub: Subscription[] = []

  constructor(private wss: WebsocketService, private toastr: ToastrService) {
    this.wssSub.push(this.wss.getMessage().subscribe((data) => {
    }))

    this.wssSub.push(this.wss.getLogs().subscribe((data: any) => {
      console.log(data)
      let sensorlist = data.sensorReading.sensors
      if (sensorlist.eCO2Sensor >= 1200 || sensorlist.TVOCSensor >= 500 || sensorlist.tempSensor > 55 || sensorlist.humiSensor > 90){
        this.toastr.warning(`A sensor has a sensor reading that is/are not desired!, check sensor with Sensor ID: <a [routerLink]="/sensor/${data.sensorReading.sensorId}">${data.sensorReading.sensorId}</a>`, `Check sensor readings`, {
          progressBar: true,
          newestOnTop: true,
          enableHtml: true,
          disableTimeOut: "timeOut"
        })
      }
      if (data.sensorReading.trash == true){
        this.toastr.error('A sensor has detected waste materials', "trash detected", {
          progressBar: true,
          progressAnimation: "decreasing",
          disableTimeOut: "timeOut"
        })
      }

    }))


  }

  ngOnInit(){
    this.collapsed = true;
  }

  ngOnDestroy() {
    for (let item of this.wssSub){
      item.unsubscribe();
    }
  }
}

