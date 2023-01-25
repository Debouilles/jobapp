import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavParams } from '@ionic/angular';
import { CreateServicePage } from '../create-service/create-service.page';
import { ServiceDetailComponent } from 'src/app/layout/service-detail/service-detail.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})


// export class ExampleComponent {
//   public datatest = ['Amsterdam', 'Buenos Aires', 'Cairo', 'Geneva', 'Hong Kong', 'Istanbul', 'London', 'Madrid', 'New York', 'Panama City'];
//   public results = [...this.datatest];
//   handleChange(event) {
//     const query = event.target.value.toLowerCase();
//     this.results = this.datatest.filter(d => d.toLowerCase().indexOf(query) > -1);
//   }
//}
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
    picture:'',
    description:'',
  }


  //Cela fonctionne avec ces données-là
  //Arriver à faire appatraitre la liste au clic sur la searchbar + récupérer nos données


  // public datatest = ['Amsterdam', 'Buenos Aires', 'Cairo', 'Geneva', 'Hong Kong', 'Istanbul', 'London', 'Madrid', 'New York', 'Panama City'];
  // public datatest = [this.services.titre];
  // public results = [...this.datatest];
  // handleChange(event) {
  //   console.log(event);
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.datatest.filter(d => d.toLowerCase().indexOf(query) > -1);
  // }


  constructor(public http: HttpClient, private modalController: ModalController, private cdr: ChangeDetectorRef) {

    this.readAPI('https://jobapp.onrender.com/services')
    .subscribe((data) => {
      this.services = data['data'];
      this.cdr.detectChanges();
      
    });

    
  }

  readAPI(URL: string){
    return this.http.get(URL)
    
  }

  // handleChange(event) {
  //     console.log(event);
  //     const query = event.target.value.toLowerCase();
  //     this.services = this.services.filter(d => d.toLowerCase().indexOf(query) > -1);
  //   }

  
  async openCreateServiceModal() {
    const modal = await this.modalController.create({
        component: CreateServicePage,
        componentProps: {
          // pass any props that your create service component needs
        },
        cssClass: 'createServiceModal'
    });

    modal.onDidDismiss().then(() => {
      // refresh the list of services after the modal is closed
      this.readAPI('https://jobapp.onrender.com/services')
        .subscribe((data) => {
          this.services = data['data'];
        });
    });


    return await modal.present();
}

async afficheService(service : any) {
  const modal = await this.modalController.create({
    
      component: ServiceDetailComponent,
      componentProps: { 
        data: service
        // pass any props that your create service component needs
      },
      cssClass: 'ModalPage'
      
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


