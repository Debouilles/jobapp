import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceListPageRoutingModule } from './service-list-routing.module';

import { services } from './service-list.page';
import { ServiceDetailComponent } from 'src/app/layout/service-detail/service-detail.component';
import { ServiceDetailModule } from 'src/app/layout/service-detail/service-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceListPageRoutingModule,
    ServiceDetailModule
  ],
  declarations: [services]
})
export class ServiceListPageModule {}
