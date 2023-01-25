import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../../models/service';
import { AuthService } from '../../auth/auth.service';

import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { ServiceResponse } from 'src/app/models/service-response';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = 'https://jobapp.onrender.com/services';
   servicesMain = new Subject<Service[]>();

  constructor(private http: HttpClient, private authService: AuthService) {
   

   }

   //Observables
   getAnimals$(): Observable<Service[]> {
    // const servicesUrl = `${environment.apiUrl}services`;
    return this.http.get<ServiceResponse[]>(this.baseUrl);
  }

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



  //SUBJECT failed...
 
  // getServicesUpdatedListener() {
  //   this.servicesMain.asObservable();
  //   return this.servicesMain.asObservable();
  // }

  // updateServicesList(services: Service[]) {
  //   this.servicesMain.next(services);
  // }
  // //READ------------------------------
  // async readAPI() {
  //   return this.http.get('https://jobapp.onrender.com/services')

  // }

  // getServices(): any {
  //   return this.servicesMain;
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
          // calling the subject's next() method with the updated list of services
          // this.servicesUpdated.next(this.servicesMain);
          return new Service(picture, location, titre, type, date, description);

        }),
        catchError(error => {
          // handle errors here
          // console.log(error);
          return throwError(error);
        })
      );
  }

  getAuthSync() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return { headers: headers };
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

  async getAuth() {
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



  updateService(id: string, picture: string, location: object, titre: string, date: Date, type: string, description: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    // const serviceData = { picture, location, titre, type, date };
    const serviceData = {
      picture: picture,
      titre: titre,
      date: date,
      type: type

    };

    const serviceDataClean = Object.entries(serviceData)
      .filter(([key, value]) => value)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    console.log(serviceDataClean)


    return this.http.put(`${this.baseUrl}/${id}`, serviceDataClean, httpOptions)
      .pipe(
        map(response => {
          // convert the response data to an instance of the Service class
          console.log(response)
        }),
        catchError(error => {
          // handle errors here
          return throwError(error);
        })
      ).subscribe(
        (data) => console.log("success: ", data),
        (error) => console.log("error: ", error)
      );
  }



  // updateServiceOld(id: string, picture: string, location: object, titre: string, date: Date, type: string, description: string): Observable<Service> {
  //   console.log("HELP")

  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  //   const serviceData = { picture, location, titre, type, date };
  //   return this.http.put(`${this.baseUrl}/${id}`, serviceData, httpOptions)
  //     .pipe(
  //       map(response => {
  //         // map the response to a Service object
  //         console.log("THE RESPONSE: " + response)
  //         return new Service(picture, location, titre, type, date);
  //       }),
  //       catchError(error => {
  //         // handle errors here
  //         return throwError(error);
  //       })

  //     );
  // }

  //  updateService(id: string, picture: string, location: object, titre: string, date: Date, type: string, description: string): Observable<Service>{
  //  console.log("HELP")
  //  let httpOptions = this.getAuthSync()
  //  console.log(httpOptions)
  //   const serviceData = { picture, location, titre, type, date };
  //   this.http.put(`${this.baseUrl}/${id}`, serviceData, httpOptions)
  //   .pipe(
  //     map(response => {
  //       // map the response to a Service object
  //       console.log("THE RESPONSE: "+response)
  //       return new Service(picture, location, titre, type, date);
  //     }),
  //     catchError(error => {
  //       // handle errors here
  //       return throwError(error);
  //     })
  //   ).subscribe(
  //     (data) => console.log("success: ", data),
  //     (error) => console.log("error: ", error)
  //   );
  // }



  // updateService(id: string, picture: string, location: object, titre: string, date: Date, type: string, description: string): Observable<Service> {

  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   this.authService.getToken$().subscribe((token) => {
  //     httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);

  //   });


  //   const serviceData = { picture, location, titre, type, date };
  //   return this.http.patch<Service>(`${this.baseUrl}/${id}`, serviceData, httpOptions)
  //     .pipe(
  //       map(response => {
  //         // map the response to a Service object
  //         return new Service(picture, location, titre, type, date);
  //       }),
  //       catchError(error => {
  //         // handle errors here
  //         return throwError(error);
  //       })
  //     );
  // }


  // async updateService(id: string){

  //   let httpOptions = await this.getAuth()

  // }

  async deleteService(id: string) {
    // const httpOptions = await this.getAuth()
    let httpOptions = await this.getAuth()
    this.http.delete(`${this.baseUrl}/${id}`, httpOptions).subscribe(async data => {

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


