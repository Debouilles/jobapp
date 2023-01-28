import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavParams } from '@ionic/angular';
import { CreateServicePage } from '../create-service/create-service.page';
import { ServiceDetailComponent } from 'src/app/layout/service-detail/service-detail.component';
import { ChangeDetectorRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { AuthService } from "src/app/auth/auth.service";

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
      private auth: AuthService,) {


  }

  readAPI(URL: string) {
    return this.http.get(URL)

  }

  ionViewWillEnter(){

    this.readAPI('https://jobapp.onrender.com/rdvs')
      .subscribe((data) => {
        this.rdvs = data;
        this.allRdvs = this.rdvs
        console.log(this.rdvs)
        this.cdr.detectChanges();
      });

    this.userID = this.auth.getUser$();
    this.auth.getUser$().subscribe(data => {
      this.userID = data._id;
      this.userName = data.name;
      this.userEmail = data.email;
    });
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

  confirmRdv(id){
    console.log("confirm: "+id)
  }

  refuteRdv(id){
    console.log("refute: "+id)
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
    setTimeout(() => {
      this.today = new Date().toISOString();
      
    });
  }

  public ngAfterViewInit(): void {
    // Bug: https://github.com/ionic-team/ionic/issues/19289
    setTimeout(() => this.cdr.markForCheck());
  }

}
