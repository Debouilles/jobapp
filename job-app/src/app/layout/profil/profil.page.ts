import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

import { Service } from 'src/app/models/service';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/services/service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  selectTabs = 'default';

  userID: any;
  services: any;
  
  serviceData = {
    _id: '',
    titre:'',
    type: '',
    date: '',
    provider: '',
    location:'',
    picture:'',
  }
  
  constructor(
    public http: HttpClient,
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private serviceService: ServiceService,
    private toastController: ToastController
  ) {
    this.userID = this.auth.getUser$();
    this.auth.getUser$().subscribe(data => {
      this.userID = data._id;
      console.log(this.userID)
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
  
  readAPI(URL: string){
    return this.http.get(URL)
  }


 async deleteServ(service: Service){
 await this.serviceService.deleteService(service._id)
console.log("deleted")
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

  updateServ(){
    console.log('update')
  }

}
