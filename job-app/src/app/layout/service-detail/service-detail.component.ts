import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { MiniMapComponent } from '../mini-map/mini-map.component';
import { RdvService } from '../services/rdv.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],


})
export class ServiceDetailComponent implements OnInit {
  data: any;
  isOwner: boolean;
  loggedUser: string;

  constructor(
    public alertController: AlertController,
    public viewCtrl: NavController,
    private modalController: ModalController,
    private rdvServ: RdvService) {


    this.loggedUser = localStorage.getItem('user_id')

  }

  //A FAIRE !! take id from localstorage, send request with body to rdvs avec les 2 userid et leserviceid
  //aussi faire si service provider = id en localstorage 
  //si rdv existe pour le service, ne plus l'afficher ? ou si isAccepted?


  async takeRdv(service: any) {
    // console.log(data)
    // console.log(this.loggedUser)
    let contract = {
      provider: service.provider,
      reciever: this.loggedUser,
      relatedService: service._id
    }
    console.log(contract)
    await this.rdvServ.createRdv(contract)


  }


  closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    if (this.data.provider === this.loggedUser) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }

  }



      // async function presentAlert() {
    //   const alert = await this.alertController.create({
    //     header: 'Rendez-vous déjà pris',
    //   });

    //   await alert.present();
    // }

}
