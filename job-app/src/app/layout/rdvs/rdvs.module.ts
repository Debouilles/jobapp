import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RDVSPageRoutingModule } from './rdvs-routing.module';

import { RDVSPage } from './rdvs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RDVSPageRoutingModule
  ],
  declarations: [RDVSPage]
})
export class RDVSPageModule {}
