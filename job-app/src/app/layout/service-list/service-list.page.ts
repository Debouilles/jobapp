import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavParams } from '@ionic/angular';
import { CreateServicePage } from '../create-service/create-service.page';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})



export class services {
  services: any;
  serviceApiUrl = '';
  serviceData = {
    _id: '',
    titre:'',
    type: '',
    date: '',
    provider: '',
    location:'',
    img:'',
  }


  constructor(public http: HttpClient, private modalController: ModalController) {

    this.readAPI('https://jobapp.onrender.com/services')
      .subscribe((data) => {
        this.services = data['data'];
      });
  }

  readAPI(URL: string){
    return this.http.get(URL)
  }

  async openCreateServiceModal() {
    const modal = await this.modalController.create({
        component: CreateServicePage,
        componentProps: {
          // pass any props that your create service component needs
        },
        cssClass: 'createServiceModal'
    });
    return await modal.present();
}

//géré dans create-service
// async closeModal() {
//   await this.modalController.dismiss();

// }
}




// export class services{
//   serviceApiUrl = '';
//   serviceData = {
//     _id: '',
//     titre:'',
//     type: '',
//     date: '',
//     provider: '',
//     location:''


//   }



// constructor(public http: HttpClient) {
//     this.readAPI('https://jobapp.onrender.com/services')
//       .subscribe((data) => {
//         console.log(data)
//         // this.serviceData.titre = data['data']['titre']
//         this.serviceData = data['data'];
//       });
  
//   }
  
// readAPI(URL: string){
//   return this.http.get(URL)
// }


// export class ServiceListPage implements OnInit {


// constructor(public http: HttpClient) {


//   this.readAPI('https://jobapp.onrender.com/services')
//     .subscribe((data) => {
//       console.log(data);
//     });

// }
// readAPI(URL: string) {
//   return this.http.get(URL);
// }

// ngOnInit() {

// }
//}


