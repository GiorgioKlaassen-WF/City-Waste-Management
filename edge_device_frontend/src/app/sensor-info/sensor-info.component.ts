import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../Services/device.service";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common'
import { Subscription } from "rxjs";
import { WebsocketService } from "../Services/websocket.service";

@Component({
  selector: "app-sensor-info",
  templateUrl: "./sensor-info.component.html",
  styleUrls: ["./sensor-info.component.scss"]
})
export class SensorInfoComponent implements OnInit {

  SensorReading: any[] = [];
  largeObject: any;
  pipe = new DatePipe('en-US');

  single: any[] | undefined;
  view: any[] = [500, 350];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#e8e8e8';

  private wssSub : Subscription;
  public device: any | undefined;

  constructor(private deviceService: DeviceService, private route: ActivatedRoute, private wss: WebsocketService) {
    this.wssSub = this.wss.getLogs().subscribe((data: any) => {
      this.single = this.formatChart(data.sensorReading)
    })
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
    this.deviceService.getLatestReading(id).subscribe( (latestReading: any) => {
      this.single = this.formatChart(latestReading);
    })

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

  formatChart(latestReading: any){
    return [
      {
        "name": "CO2 (ppm)",
        "value": latestReading?.sensors?.eCO2Sensor,
      },
      {
        "name": "TVOC (ppb)",
        "value": latestReading?.sensors?.TVOCSensor
      },
      {
        "name": "Particle matter",
        "value": latestReading?.sensors?.dustSensor
      },
      {
        "name": "Temperature",
        "value": latestReading?.sensors?.tempSensor + "C°"
      },
      {
        "name": "Humidity",
        "value": latestReading?.sensors?.humiSensor + "% RHm"
      },
      {
        "name": "Air Pressure",
        "value": latestReading?.sensors.pressureSensor + "Pa"
      },
      {
        "name": "Trash",
        "value": latestReading?.trash
      }
    ]
  }


}


