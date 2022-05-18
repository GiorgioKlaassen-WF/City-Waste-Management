import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { EventsComponent } from "./events/events.component";
import { MapComponent } from "./map/map.component";
import { DataComponent } from "./data/data.component";
import { SensorsComponent } from "./sensors/sensors.component";
import { SensorInfoComponent } from "./sensor-info/sensor-info.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'welcome', component: HomeComponent },
  { path: 'events', component: EventsComponent},
  { path: 'map', component: MapComponent},
  { path: 'data', component: DataComponent},
  { path: 'sensor', component: SensorsComponent},
  { path: 'sensor/:id', component: SensorInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
