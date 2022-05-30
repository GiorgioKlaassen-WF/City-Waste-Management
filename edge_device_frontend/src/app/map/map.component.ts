import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { icon, Marker } from 'leaflet';
import { MapService } from "../Services/map.service";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

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

