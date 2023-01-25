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


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  selectTabs = 'default';

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


  servicesSub: Service[];
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

  ) {
    this.userID = this.auth.getUser$();
    this.auth.getUser$().subscribe(data => {
      this.userID = data._id;
      this.userName = data.name;
      this.userEmail = data.email;
    });

  
  }


  ionViewWillEnter(): void {
    this.http.get('https://jobapp.onrender.com/services').subscribe((servicesSub) => {
      console.log(`Services loaded`, servicesSub);
      this.services= servicesSub['data']
      // this.cdr.detectChanges();
    });
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




  async deletedMessage() {
    const toast = await this.toastController.create({
      message: 'Service supprimé !',
      duration: 3500,
      position: 'bottom'
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
