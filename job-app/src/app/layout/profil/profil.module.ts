import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';
import { ModalController } from '@ionic/angular';
import { ProfilPage } from './profil.page';
import { ServiceDetailModule } from '../service-detail/service-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
