import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ServiceDetailComponent } from './service-detail.component';
import { MapComponent } from '../map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [ServiceDetailComponent],
  imports: [
   CommonModule , IonicModule,
  ],
  exports: [ServiceDetailComponent]
})
export class ServiceDetailModule { }
