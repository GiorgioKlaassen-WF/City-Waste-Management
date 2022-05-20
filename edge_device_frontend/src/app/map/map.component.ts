import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { Observable } from "rxjs";
import { MapService } from "../Services/map.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  private map: L.Map | L.LayerGroup<any> | undefined;

  constructor(private mapService: MapService) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.36843, 5.22019],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: ''
    });

    tiles.addTo(this.map);
    this.mapService.getMapDataMarkers(this.map)

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
  }

}

