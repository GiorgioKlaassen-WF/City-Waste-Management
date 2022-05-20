import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public collapsed: boolean = true;
  title = 'edge_device_frontend';

  ngOnInit(){
    this.collapsed = true;
  }
}

