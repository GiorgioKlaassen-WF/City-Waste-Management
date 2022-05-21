import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../Services/device.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: "app-sensor-info",
  templateUrl: "./sensor-info.component.html",
  styleUrls: ["./sensor-info.component.scss"]
})
export class SensorInfoComponent implements OnInit {

  SensorReading: any[] = [];
  MapSeries: any[] | undefined;
  pipe = new DatePipe('en-US');
  view: any[] = [700, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Time";
  yAxisLabel: string = "Sensor readings";
  timeline: boolean = true;

  colorScheme = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"]
  };

  public device: any | undefined;

  constructor(private deviceService: DeviceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.deviceService.getDeviceInfo(id).subscribe((deviceData) => {
      this.device = deviceData;
      this.SensorReading?.push(this.mapTempData(deviceData))
      this.SensorReading?.push(this.mapCO2Data(deviceData))
      this.SensorReading?.push(this.mapHumiData(deviceData))
      this.SensorReading?.push(this.mapTVOCData(deviceData))

    });
  }

  mapTempData(deviceData: any) {
    let readings = deviceData.readings;
    let seriesData: Array<any> = []
    console.log(deviceData)

    for (let sensorData of readings){
      let sensorReadingSeriesData = {
        "name": this.pipe.transform(sensorData.createdAt, "M/d/yy, h:mm"),
        "value": sensorData.sensors.tempSensor,
      }
      seriesData.push(sensorReadingSeriesData)
    }
    let tempSeries = [{
      "name": "Temperature",
      "series": seriesData
    }]
    return tempSeries
  }

  mapCO2Data(deviceData: any) {
    let readings = deviceData.readings;
    let seriesData: Array<any> = []

    for (let sensorData of readings){
      let sensorReadingSeriesData = {
        "name": this.pipe.transform(sensorData.createdAt, "M/d/yy, h:mm"),
        "value": sensorData.sensors.eCO2Sensor,
      }
      seriesData.push(sensorReadingSeriesData)
    }
    let eCO2Series = [{
      "name": "eCO2",
      "series": seriesData
    }]
    return eCO2Series
  }

  mapHumiData(deviceData: any) {
    let readings = deviceData.readings;
    let seriesData: Array<any> = []

    for (let sensorData of readings){
      let sensorReadingSeriesData = {
        "name": this.pipe.transform(sensorData.createdAt, "M/d/yy, h:mm"),
        "value": sensorData.sensors.humiSensor,
      }
      seriesData.push(sensorReadingSeriesData)
    }
    let humiSeries = [{
      "name": "Humidity",
      "series": seriesData
    }]
    return humiSeries
  }

  mapTVOCData(deviceData: any) {
    let readings = deviceData.readings;
    let seriesData: Array<any> = []

    for (let sensorData of readings){
      let sensorReadingSeriesData = {
        "name": this.pipe.transform(sensorData.createdAt, "M/d/yy, h:mm"),
        "value": sensorData.sensors.TVOCSensor,
      }
      seriesData.push(sensorReadingSeriesData)
    }
    let TVOCSeries = [{
      "name": "TVOC",
      "series": seriesData
    }]
    return TVOCSeries
  }


}

