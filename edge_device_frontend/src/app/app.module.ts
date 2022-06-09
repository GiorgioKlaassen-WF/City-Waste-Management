import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { DataComponent } from './data/data.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SensorsComponent } from './sensors/sensors.component';
import { HttpClientModule } from "@angular/common/http";
import { SensorInfoComponent } from './sensor-info/sensor-info.component';
import { MapEncapsulationComponent } from './map-ecaptulation/map-encapsulation.component';
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { HomePanelComponent } from './home-panel/home-panel.component';
import { ToastrModule } from "ngx-toastr";


const config: SocketIoConfig = { url: 'ws://139-162-139-209.ip.linodeusercontent.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    MapComponent,
    DataComponent,
    SensorsComponent,
    SensorInfoComponent,
    MapEncapsulationComponent,
    HomePanelComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    LeafletModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({
      preventDuplicates: true,
      enableHtml: true,
      countDuplicates: true,
      closeButton: true,
      maxOpened: 3,
      autoDismiss: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
