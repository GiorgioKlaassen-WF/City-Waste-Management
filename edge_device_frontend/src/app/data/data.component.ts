import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.scss"]
})
export class DataComponent implements OnInit {

  multi: any[] | undefined;
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
  yAxisLabel: string = "Trash";
  timeline: boolean = true;

  colorScheme = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"]
  };

  constructor() {
    Object.assign(this, { multi });
  }


  ngOnInit(): void {
  }


}

export var multi = [
  {
    "name": "Stations plein",
    "series": [
      {
        "name": "12:20",
        "value": 0
      },
      {
        "name": "12:30",
        "value": 1
      },
      {
        "name": "12:40",
        "value": 3
      }
    ]
  },

  {
    "name": "Markt plein",
    "series": [
      {
        "name": "12:20",
        "value": 6
      },
      {
        "name": "12:30",
        "value": 2
      },
      {
        "name": "12:40",
        "value": 1
      }
    ]
  }

];
