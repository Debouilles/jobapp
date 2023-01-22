import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceMapPageRoutingModule } from './service-map-routing.module';

import { ServiceMapPage } from './service-map.page';
import { MapModule } from '../map/map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceMapPageRoutingModule,
    MapModule
  ],
  declarations: [ServiceMapPage]
})


export class ServiceMapPageModule {

 
}
