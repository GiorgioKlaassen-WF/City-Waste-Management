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

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    MapComponent,
    DataComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
