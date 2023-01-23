import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ServiceDetailComponent } from './service-detail.component';
import { ServiceMapPage } from '../service-map/service-map.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map, latLng, MapOptions, marker, Marker, tileLayer } from 'leaflet';

@NgModule({
  declarations: [ServiceDetailComponent],
  imports: [
   CommonModule , IonicModule,
  ],
  exports: [ServiceDetailComponent]
})
export class ServiceDetailModule { }
