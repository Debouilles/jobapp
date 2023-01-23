import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service';
import { NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  data: any;

  constructor(alertController: AlertController) {

    async function presentAlert() {
      const alert = await this.alertController.create({
        header: 'Rendez-vous déjà pris',
      });
  
      await alert.present();
    }
  }

  ngOnInit() {


  }

}
