import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as L from "leaflet";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class MapService {

  private url = "https://139-162-139-209.ip.linodeusercontent.com/api/";

  constructor(private http: HttpClient, private router: Router) {
  }

  // @ts-ignore
  public getMapDataMarkers(map: L.map): void {
    this.http.get(this.url + "sensor/map/data").subscribe((sensors) => {
      // @ts-ignore
      for (let sensor of sensors) {
        if (sensor.location.lat != undefined && sensor.location.lon != undefined) {
          let lon = sensor.location.lon;
          let lat = sensor.location.lat;
          const marker = L.marker([lat, lon]);
          marker.bindPopup(this.MapDataMarkerPopUp(sensor))
          marker.addTo(map);
        }
      }
    });
  }

  private MapDataMarkerPopUp(data:any): string{
    if (data.sensors[0] != undefined){
      let sensorData = data.sensors[0].sensors
      return `` +
        `<div>Temperature: ${ sensorData.tempSensor}</div>` +
        `<div>Humidity: ${ sensorData.humiSensor}</div>` +
        `<div>PM Sensor: ${ sensorData.dustSensor}</div>` +
        `<div>TVOC: ${ sensorData.TVOCSensor}</div>` +
        `<div>eCO2: ${ sensorData.eCO2Sensor}</div>` +
        `<div>Air Pressure: ${ sensorData.pressureSensor}</div>` +
        `<div>CO2eq: ${ sensorData.CO2eqSensor}</div>` +
        `<a class="btn btn-primary" href="/sensor/${data._id}" >Go to Sensor</a>`
    }
    return "No Data"
  }
}
