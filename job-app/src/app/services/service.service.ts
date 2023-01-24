import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../models/service';
import { AuthService } from '../auth/auth.service';

import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = 'https://jobapp.onrender.com/services';
  constructor(private http: HttpClient, private authService: AuthService) { }

  //AUTH
  // setAuthorizationHeader(token: string): any {
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
  //   return httpOptions;
  // }


  //------------------------------------------------------

  //CREATE
  createService(picture: string, location: object, titre: string, date: Date, type: string, description: string): Observable<Service> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.authService.getToken$().subscribe((token) => {
      httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    });
    //FAIRE LOCA

    //note: provider mis auto par l'API
    const serviceData = { picture, location, titre, type, date, description };
    console.log(serviceData)
    return this.http.post<Service>(this.baseUrl, serviceData, httpOptions)
      .pipe(
        map(response => {
          // map the response to a User object
          console.log(response)
          return new Service();

        }),
        catchError(error => {
          // handle errors here
          // console.log(error);
          return throwError(error);
        })
      );
  }


  //DELETE
  // async deleteService(id: string) {
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   const token = await this.authService.getToken$().toPromise();
  //   httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
  //   return this.http.delete(`${this.baseUrl}/${id}`, httpOptions)
  // }

async getAuth(){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  this.authService.getToken$().subscribe((token) => {
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    
  });
  return httpOptions
}


  async deleteService(id: string) {
    // const httpOptions = await this.getAuth()
    let httpOptions = await this.getAuth()
    console.log("LES HEADERS:"+httpOptions.headers)
    this.http.delete(`${this.baseUrl}/${id}`,  httpOptions ).subscribe(async data => {
        
    });
  
  }

  // async deleteService(id: string) {
  //   //MARCHE PAS EN FONCTION :( )
  //   //   let auth;
  //   //   this.authService.getToken$().subscribe((token) => {
  //   //     auth = this.setAuthorizationHeader(token);
  //   // });

  //   //AUTH-----------
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   // this.authService.getToken$().subscribe((token) => {
  //   //   httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
  //   // });
  //   // const token = await this.authService.getToken$().toPromise();
  //   // httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
  //   // console.log("hello")
  //   // //---------------
  //   // console.log(httpOptions)

  //   // return this.http.delete(`${this.baseUrl}/${id}`, httpOptions).toPromise();
  //   try {
  //     const token = await this.authService.getToken$().toPromise();
  //     httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
  //     console.log("hello")
  //     await this.http.delete(`${this.baseUrl}/${id}`, httpOptions).toPromise();
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }


}


