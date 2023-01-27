import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

import { Service } from 'src/app/models/service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/layout/services/service.service';
import { ModalController, ToastController } from '@ionic/angular';
import { CreateServicePage } from '../create-service/create-service.page';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {


  handlerMessage = '';
  roleMessage = '';
  selectTabs = 'default';

  allDataLoaded: boolean;

  index: number;
  userID: any;
  userName: any;
  userEmail: any;
  services: any;

  serviceData = {
    _id: '',
    titre: '',
    type: '',
    date: '',
    provider: '',
    location: '',
    picture: '',
  }


  // servicesSub: Service[];
  service : any;
  allServices: any;

  private servicesSubscription: Subscription;

  constructor(
    public http: HttpClient,
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private serviceService: ServiceService,
    private toastController: ToastController,
    private modalController: ModalController,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,

  ) {
    this.userID = this.auth.getUser$();
    this.auth.getUser$().subscribe(data => {
      this.userID = data._id;
      this.userName = data.name;
      this.userEmail = data.email;
    });

    this.index = 1;
    this.readAPI('https://jobapp.onrender.com/services?page='+this.index)
    .subscribe((data) => {
      this.services = data['data'];
      this.allServices = this.services
      console.log(this.services)
      this.cdr.detectChanges();
    });

  
  }


  ionViewWillEnter(): void {
    this.http.get('https://jobapp.onrender.com/services').subscribe((servicesSub) => {
      console.log(`Services loaded`, servicesSub);
      this.services= servicesSub['data']
      // this.cdr.detectChanges();
      
    });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Voulez-vous vraiment supprimer cette annonce ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Supprimer',
          role: 'confirm',
          handler: () => {
          this.deleteServ(this.service)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }


  loadMoreData() {
    this.index ++;
    this.readAPI('https://jobapp.onrender.com/services?page='+this.index)
    .subscribe((data) => {
      console.log("DATA!!!:"+ data['data'])
      this.services.push(...data['data']);
      console.log(this.services)
      // this.cdr.detectChanges();
      if(this.services.length >= this.allServices.length){
        this.allDataLoaded = true;
      }
    });
  }




  async afficheServiceCall(service : any) {
    this.serviceService.afficheService(service)
  }
  

  ngOnInit() {


  }
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  readAPI(URL: string) {
    return this.http.get(URL)
  }


  async deleteServ(service: Service) {
    await this.serviceService.deleteService(service._id)

    await this.deletedMessage()
    this.readAPI('https://jobapp.onrender.com/services')
    .subscribe((data) => {
      this.services = data['data'];
      return this.services;
    });
    this.cdr.detectChanges();

    this.cdr.detectChanges();
    console.log("deleted")
  }

  // deleteCompte() {
  //   console.log('compte supprimé.');
  //   this.auth.deleteService(user._id);
  //   this.router.navigateByUrl("/registrate");
  // }


  async deletedMessage() {
    const toast = await this.toastController.create({
      message: 'Service supprimé !',
      color: 'danger',
      duration: 3500,
      position: 'bottom',
      cssClass: 'deleted-toaster'
    });

    await toast.present();
  }


  async updateServ(serviceId) {
    // console.log(service)
    const modal = await this.modalController.create({
      component: CreateServicePage,
      componentProps: {
        // pass any props that your create service component needs
        serviceToUpdate: serviceId
      },
      cssClass: 'createServiceModal'
    });
    return await modal.present();
  }


}
