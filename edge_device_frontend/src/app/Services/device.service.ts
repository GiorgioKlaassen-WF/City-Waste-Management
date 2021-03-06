import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url = "https://139-162-139-209.ip.linodeusercontent.com/api/";

  constructor(private http: HttpClient) {
  }

  public getDevices(){
    return this.http.get(this.url + "sensor")
  }
  public getDeviceInfo(id: string | null){
    return this.http.get(this.url + `sensor/${id}/data`)
  }

  public getLatestReading(id: string | null) {
    return this.http.get(this.url + `sensor/${id}/latest`)
  }


}
