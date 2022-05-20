import { Component, OnInit } from '@angular/core';
import { DeviceService } from "../Services/device.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sensor-info',
  templateUrl: './sensor-info.component.html',
  styleUrls: ['./sensor-info.component.scss']
})
export class SensorInfoComponent implements OnInit {

  public device: any | undefined;

  constructor(private deviceService: DeviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.deviceService.getDeviceInfo(id).subscribe((deviceData) => {
      this.device = deviceData;
      console.log(deviceData)
    })
  }

}
