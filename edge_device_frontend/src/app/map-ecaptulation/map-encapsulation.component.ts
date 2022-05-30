import { Component, Input, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-map-ecaptulation',
  templateUrl: './map-encapsulation.component.html',
  styleUrls: ['./map-encapsulation.component.scss']
})
export class MapEncapsulationComponent implements OnInit {

  @Input() data: any;

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

  constructor() {
  }

  ngOnInit(): void {
    this.MapSeries = this.data
  }

}
