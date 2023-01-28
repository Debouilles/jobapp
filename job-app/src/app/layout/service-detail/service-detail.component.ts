import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { MiniMapComponent } from '../mini-map/mini-map.component';
import { RdvService } from '../services/rdv.service';
import { map } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],


})
export class ServiceDetailComponent implements OnInit {
  data: any;
  isOwner: boolean;
  isWaiting: boolean;
  isTaken: boolean;
  loggedUser: string;
  coords: any;

  constructor(
    public alertController: AlertController,
    public viewCtrl: NavController,
    private modalController: ModalController,
    private rdvServ: RdvService,
    public cdr: ChangeDetectorRef,
    public toast: ToastController,
    private serv: ServiceService) {


    this.loggedUser = localStorage.getItem('user_id')

  }


  onSubmit(id){
    this.serv.deleteService(id).subscribe(
      (data) => {
          console.log("success: ", data);
          this.deletedMessage();
          this.closeModal();
          this.cdr.detectChanges();
          // show a toaster message here
      },
      (error) => console.log("error: ", error)
    );
  }


  deleteService(id){
    console.log(id)
   
    // this.serv.
  }


  //A FAIRE !! take id from localstorage, send request with body to rdvs avec les 2 userid et leserviceid
  //aussi faire si service provider = id en localstorage 
  //si rdv existe pour le service, ne plus l'afficher ? ou si isAccepted?

checkAvailability(){
  if (this.data.provider === this.loggedUser) {
    this.isOwner = true;
  } else {
    this.isOwner = false;
  }
  // console.log(this.data)
  this.rdvServ.checkIfIsAlive(this.data._id)
    .subscribe(response => {
      // console.log(response);

      if(Array.isArray(response) && response.length > 0) {
        if (response[0].relatedService === this.data._id) {
            this.isWaiting = true;
        } else if (response[0].relatedService === undefined) {
            this.isWaiting = false;
        }
    } else {
        this.isWaiting = false;
    }

    }, error => {
      console.error(error);
      this.isWaiting = false;
    });

}


async waitingMessage() {
  const toast = await this.toast.create({
    message: 'Service en attente !',
    duration: 2500,
    position: 'bottom',
    color: 'warning',
    cssClass: 'sucess-toaster'
  });

  await toast.present();
}


async deletedMessage() {
  const toast = await this.toast.create({
    message: 'Service supprimé !',
    duration: 2500,
    position: 'bottom',
    color: 'danger',
    cssClass: 'sucess-toaster'
  });

  await toast.present();
}




  takeRdv(service: any) {
    // console.log(data)
    // console.log(this.loggedUser)
    let contract = {
      // provider: service.provider,
      reciever: this.loggedUser,
      relatedService: service._id
    }
    // console.log(contract)
    this.rdvServ.createRdv(contract).subscribe((response) => {

    },
      (error) => {
        console.error(error);
      }

    );

    this.closeModal()
    this.waitingMessage()

  }


  closeModal() {
    this.modalController.dismiss();
    
  }


ionViewWillEnter(){
  if (this.data.provider === this.loggedUser) {
    this.isOwner = true;
  } else {
    this.isOwner = false;
  }
  this.coords = this.data.location
  // console.log(this.data)
  this.rdvServ.checkIfIsAlive(this.data._id)
    .subscribe(response => {
      // console.log(response);

      if(Array.isArray(response) && response.length > 0) {
        if (response[0].relatedService === this.data._id) {
            this.isWaiting = true;
        } else if (response[0].relatedService === undefined) {
            this.isWaiting = false;
        }
    } else {
        this.isWaiting = false;
    }

    }, error => {
      console.error(error);
      this.isWaiting = false;
    });

}



  ngOnInit() {
   

  }



}
