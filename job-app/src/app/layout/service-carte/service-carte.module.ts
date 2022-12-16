import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceCartePageRoutingModule } from './service-carte-routing.module';

import { ServiceCartePage } from './service-carte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceCartePageRoutingModule
  ],
  declarations: [ServiceCartePage]
})
export class ServiceCartePageModule {}
