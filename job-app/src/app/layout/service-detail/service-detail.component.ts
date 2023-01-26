import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { MiniMapComponent } from '../mini-map/mini-map.component';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],


})
export class ServiceDetailComponent implements OnInit {
  data: any;
  isOwner: boolean;

  constructor(alertController: AlertController, public viewCtrl: NavController, private modalController: ModalController) {

    async function presentAlert() {
      const alert = await this.alertController.create({
        header: 'Rendez-vous déjà pris',
      });

      await alert.present();
    }
  }

  //A FAIRE !! take id from localstorage, send request with body to rdvs avec les 2 userid et leserviceid
  //aussi faire si service provider = id en localstorage 

  async takeRdv(data) {
    console.log(data)
  }


  closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    if (this.data.provider === localStorage.getItem('user_id')){
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }

  }

}
