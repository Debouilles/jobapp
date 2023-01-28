import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavParams } from '@ionic/angular';
import { CreateServicePage } from '../create-service/create-service.page';
import { ServiceDetailComponent } from 'src/app/layout/service-detail/service-detail.component';
import { ChangeDetectorRef } from '@angular/core';
import { ServiceService } from '../services/service.service';


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

  index: number;



//ts..-_-
  public results;
  public allServices:[];
  public allDataLoaded: boolean;

  handleChange(event) {
    
    // console.log(event);
    const query = event.target.value.toLowerCase();
    console.log(query)
    this.results = this.services.filter(d => {
        // console.log(d);
        return d.titre.toLowerCase().indexOf(query) > -1;
    });
    console.log(this.results)
    if(query.length === 0) {
      this.services = this.allServices;
   }
     else {
      this.services = this.results;
    }

    this.cdr.detectChanges();


}
  
//  ngOnChanges(){
//   this.cdr.detectChanges();
//  }

  constructor(public http: HttpClient, private modalController: ModalController, private cdr: ChangeDetectorRef, private serviceService: ServiceService) {

  }

  readAPI(URL: string){
    return this.http.get(URL)
    
  }


  ionViewWillEnter(): void {

    this.index = 1;
    this.readAPI('https://jobapp.onrender.com/services?page='+this.index)
    .subscribe((data) => {
      this.services = data['data'];
      
      this.allServices = this.services
      console.log(this.services)
      this.cdr.detectChanges();
    });

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



  ///DO HERE THE MODAL SO IT UPDATES -___-

  async afficheService(service : any) {
    const modal = await this.modalController.create({
        component: ServiceDetailComponent,
        componentProps: { 
          data: service
          // pass any props that your create service component needs
        },
        cssClass: 'ModalPage'
        
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


  async afficheServiceCall(service : any) {
    console.log("helloWOrlds")
    this.serviceService.afficheService(service)
    
   
  }



  // async openDetailServModal() {
  //   const modal = await this.modalController.create({
  //       component: CreateServicePage,
  //       componentProps: {
  //         // pass any props that your create service component needs
  //       },
  //       cssClass: 'createServiceModal'
  //   });

  //   modal.onDidDismiss().then(() => {
  //     // refresh the list of services after the modal is closed
  //     this.readAPI('https://jobapp.onrender.com/services')
  //       .subscribe((data) => {
  //         this.services = data['data'];
  //       });
  //   });



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


