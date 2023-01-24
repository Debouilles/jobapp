import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { NavParams, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
})
export class ServiceDetailComponent implements OnInit {
  data: any;

  constructor(alertController: AlertController, public viewCtrl : NavController) {

    async function presentAlert() {
      const alert = await this.alertController.create({
        header: 'Rendez-vous déjà pris',
      });
  
      await alert.present();
    }
  }

  public closeModal() {
    this.viewCtrl.back();
}

  ngOnInit() {


  }

}
