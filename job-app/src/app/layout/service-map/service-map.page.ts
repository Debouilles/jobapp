import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavParams } from '@ionic/angular';
import { CreateServicePage } from '../create-service/create-service.page';

@Component({
  selector: 'app-service-map',
  templateUrl: './service-map.page.html',
  styleUrls: ['./service-map.page.scss'],
})
export class ServiceMapPage implements OnInit {
  
    services: any;
    serviceApiUrl = '';
    serviceData = {
      _id: '',
      titre:'',
      type: '',
      date: '',
      provider: '',
      location:'',
      picture:'',
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
      },
      cssClass: 'createServiceModal'
  });
  return await modal.present();
    
  }

  async openServiceCard() {
    const card = await this.modalController.create({
        component: CreateServicePage,
        componentProps: {
          // data: service
        },
        cssClass: 'createServiceModal'
    });
    return await card.present();
      
    }
  

 

  ngOnInit() {
   
  }

}
