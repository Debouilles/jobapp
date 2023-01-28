import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavParams, ToastButton, ToastController } from '@ionic/angular';
import { CreateServicePage } from '../create-service/create-service.page';
import { ServiceDetailComponent } from 'src/app/layout/service-detail/service-detail.component';
import { ChangeDetectorRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { AuthService } from "src/app/auth/auth.service";
import { RdvService } from '../services/rdv.service';

@Component({
  selector: 'app-rdvs',
  templateUrl: './rdvs.page.html',
  styleUrls: ['./rdvs.page.scss'],
})
export class RDVSPage implements OnInit {
  selectTabs = 'default';

  today;

  userID: any;
  userName: any;
  userEmail: any;

  rdvs: any;
  rdvApiUrl = '';
  rdvData = {
    _id: '',
    relatedService: '',
    provider: '',
    reciever: '',
    isAccepted: '',
  }

  index: number;

  public results;
  public allRdvs: [];
  public allDataLoaded: boolean;

  handleChange(event) {

    // console.log(event);
    const query = event.target.value.toLowerCase();
    console.log(`vla le query: ${query}`)
    this.results = this.rdvs.filter(d => {
      // console.log(d);
      return d.titre.toLowerCase().indexOf(query) > -1;
    });
    console.log(`this.results ${this.results}`)
    if (query.length === 0) {
      this.rdvs = this.allRdvs;
    }
    else {
      this.rdvs = this.results;
    }

    this.cdr.detectChanges();


  }

  constructor(
      public http: HttpClient, 
      private modalController: ModalController, 
      private cdr: ChangeDetectorRef, 
      private serviceService: ServiceService,
      private auth: AuthService,
      private RdvService: RdvService,
      public toast: ToastController) {

        this.userID = localStorage.getItem('user_id')
        this.refreshRdvs();
  }

  readAPI(URL: string) {
    return this.http.get(URL)

  }



  ionViewWillEnter(){

    // this.readAPI('https://jobapp.onrender.com/rdvs')
    //   .subscribe((data) => {
    //     this.rdvs = data;
    //     this.allRdvs = this.rdvs
    //     console.log(this.rdvs)
    //     this.cdr.detectChanges();
    //   });
  //   this.RdvService.getRdvs().subscribe(data => {
  //     this.rdvs = data;
  //     this.allRdvs = this.rdvs;
  //     console.log(this.rdvs);
  //     this.cdr.detectChanges();
  // });
  this.refreshRdvs();


  }
  

  loadMoreData() {
    // this.index++;
    this.readAPI('https://jobapp.onrender.com/rdvs')
      .subscribe((data) => {
        // console.log("DATA!!!:" + data['data'])
        this.rdvs.push(...data['data']);
        console.log(this.rdvs)
        // this.cdr.detectChanges();
        if (this.rdvs.length >= this.allRdvs.length) {
          this.allDataLoaded = true;
        }
      });
  }


  async afficheRdvCall(rdv: any) {
    // console.log("helloWOrlds")
    this.serviceService.afficheService(rdv)

  }

  confirmRdv(rdvId: string) {
    let updatedRdv = {isAccepted: true};
    this.RdvService.updateRdv(rdvId, updatedRdv).subscribe(
      data => {
        console.log(data);
        this.createdRdv();
        this.refreshRdvs();
        this.cdr.detectChanges();
      },
      error => {
        console.log(error);
        // this.errorMessage();
      }
    );

  }



  refuteRdv(id){
    console.log("refute: "+id)
   
    this.RdvService.deleteRdv(id).subscribe(
      data => {
        console.log(data);
        this.deletedRdv();
        this.refreshRdvs();
        this.cdr.detectChanges();
      },
      error => {
        console.log(error);
        // this.errorMessage();
      }
    );
  }



  
  refreshRdvs() {
    // retrieve updated data from API
    this.RdvService.getRdvs().subscribe(data => {
      this.rdvs = data;
      this.allRdvs = this.rdvs;
      console.log(this.rdvs);
      this.cdr.detectChanges();
      // this.cdr.detectChanges();
  });
  }


  async createdRdv() {
    const toast = await this.toast.create({
      message: 'Le RDV est pris !',
      duration: 1500,
      position: 'bottom',
      color: 'success',
      cssClass: 'sucess-toaster'
    });

    await toast.present();
  }

  async deletedRdv() {
    const toast = await this.toast.create({
      message: 'Le RDV est annulé !',
      duration: 1500,
      position: 'bottom',
      color: 'warning',
      cssClass: 'sucess-toaster'
    });

    await toast.present();
  }
  async errorMessage() {
    const toast = await this.toast.create({
      message: 'une Erreur est survenue',
      duration: 1500,
      position: 'middle',
      color: 'danger',
      cssClass: 'sucess-toaster'
    });

    await toast.present();
  }


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
      this
        .readAPI('https://jobapp.onrender.com/rdvs')
        .subscribe((data) => {
          this.rdvs = data['data'];
        });
    });


    return await modal.present();
  }

  ngOnInit() {
    this.refreshRdvs();
    setTimeout(() => {
      this.today = new Date().toISOString();
      
    });
  }

  public ngAfterViewInit(): void {
    // Bug: https://github.com/ionic-team/ionic/issues/19289
    setTimeout(() => this.cdr.markForCheck());
  }

}
