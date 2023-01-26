import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceListPageRoutingModule } from './service-list-routing.module';

import { services } from './service-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceListPageRoutingModule,
  ],
  declarations: [services]
})
export class ServiceListPageModule {}
