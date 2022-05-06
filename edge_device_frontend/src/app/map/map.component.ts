import { Component, OnInit } from "@angular/core";
import * as Leaflet from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  // @ts-ignore
  style: {};
  options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 15,
    center: new Leaflet.LatLng(52.36843, 5.22019)
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: ""
    } as Leaflet.TileLayerOptions)
  ] as Leaflet.Layer[];
};
