import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateServicePageRoutingModule } from './create-service-routing.module';

import { CreateServicePage } from './create-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateServicePageRoutingModule
  ],
  declarations: [CreateServicePage]
})
export class CreateServicePageModule {}
