import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

import { Service } from 'src/app/models/service';
import { HttpClient } from '@angular/common/http';

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
    private router: Router
  ) {
    this.userID = this.auth.getUser$();
    this.auth.getUser$().subscribe(data => {
      this.userID = data._id;
      console.log(this.userID)
    });

    this.auth.getUser$().subscribe(data => {
      this.userName = data.name;
      console.log(this.userName)
    });

    this.auth.getUser$().subscribe(data => {
      this.userEmail = data.email;
      console.log(this.userEmail)
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

}
