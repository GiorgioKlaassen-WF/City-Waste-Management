import { Component, OnInit } from '@angular/core';
import { DeviceService } from "../Services/device.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  public devices: any;


  constructor(private deviceService: DeviceService, private router: Router) { }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
      console.log(data)
    })
  }

  goToSensorView(id: any) {
    this.router.navigate([`/sensor/${id}`]);
  }
}
