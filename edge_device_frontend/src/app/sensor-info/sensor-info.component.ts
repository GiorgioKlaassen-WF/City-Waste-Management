import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../Services/device.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common'

@Component({
  selector: "app-sensor-info",
  templateUrl: "./sensor-info.component.html",
  styleUrls: ["./sensor-info.component.scss"]
})
export class SensorInfoComponent implements OnInit {

  SensorReading: any[] = [];
  largeObject: any;
  pipe = new DatePipe('en-US');

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

      this.largeObject = [
        this.mapTempData(deviceData)[0],
        this.mapCO2Data(deviceData)[0],
        this.mapHumiData(deviceData)[0],
        this.mapTVOCData(deviceData)[0]
      ]
    });
  }

  mapTempData(deviceData: any) {
    let readings = deviceData.readings;
    let seriesData: Array<any> = []

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


