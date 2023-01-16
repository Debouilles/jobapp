import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageServicePageRoutingModule } from './page-service-routing.module';

import { PageServicePage } from './page-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageServicePageRoutingModule
  ],
  declarations: [PageServicePage]
})
export class PageServicePageModule {}
