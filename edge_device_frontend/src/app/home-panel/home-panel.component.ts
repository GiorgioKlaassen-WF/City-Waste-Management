import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss']
})
export class HomePanelComponent implements OnInit {

  @Input() title?: string;
  @Input() text?: string;
  @Input() icon?: any;
  @Input() iconShape?: string

  constructor() { }

  ngOnInit(): void {

    if (this.iconShape === null){
      this.icon = true;
      this.iconShape = 'administrator';
    }
  }


}
