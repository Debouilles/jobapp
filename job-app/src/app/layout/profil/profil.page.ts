import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

import { Service } from 'src/app/models/service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/layout/services/service.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ServiceUpdateComponent } from '../service-update/service-update.component';
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

    

    this.readAPI('https://jobapp.onrender.com/services')
      .subscribe((data) => {
        this.services = data['data'];
        return this.services;
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

  async updateListOfServices() {
    this.readAPI('https://jobapp.onrender.com/services')
      .subscribe((data) => {
        this.services = data['data'];
        return this.services;
      });
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
      message: 'Deleted',
      duration: 1500,
      position: 'middle'
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
  // deleteServ(service: Service) {
  //   // this.http.delete(`https://jobapp.onrender.com/services/${service._id}`)
  //   // .subscribe(() => {
  //   //   // remove the deleted service from the services array
  //   //   this.services = this.services.filter(s => s._id !== service._id);
  //   // });


  // }

  //   async deleteServ(service: Service) {
  //     try {
  //         await this.serviceService.deleteService(service._id).toPromise();
  //         const toast =  this.toastController.create({
  //             message: 'Service deleted.',
  //             duration: 2000
  //         });
  //         toast.present();
  //     } catch (error) {
  //         const toast = await this.toastController.create({
  //             message: error.error.message,
  //             duration: 2000
  //         });
  //         toast.present();
  //     }
  // }

  //  async deleteServ(service: Service) {
  //     this.serviceService.deleteService(service._id).then(() => {
  //       this.services = this.services.filter(s => s._id !== service._id);
  //       // remove the deleted service from the services array
  //       // this.services = this.services.filter(s => s._id !== service._id);
  //       // console.log("done")
  //       const toast = await this.toastController.create({
  //         message: 'Service deleted.',
  //         duration: 2000
  //       });
  //       await toast.present();
  //     }, async error => {
  //       const toast = await this.toastController.create({
  //         message: error.error.message,
  //         duration: 2000
  //       });
  //       toast.present();

  //     });
  //   }
