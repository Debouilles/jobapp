import { ChangeDetectorRef, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../../models/service';
import { AuthService } from '../../auth/auth.service';

import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { ServiceResponse } from 'src/app/models/service-response';
import { Subject } from 'rxjs';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';
import { ModalController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = 'https://jobapp.onrender.com/services';
   servicesMain = new Subject<Service[]>();

  constructor(private http: HttpClient, private authService: AuthService, private modalController: ModalController) {
   

   }
//NOTE:!!
//On s'est occupé de la ressource RDV en deuxième et est beaucoup mieux géré avec des observables
//On s'est un peu débrouillé ici 

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
          console.log(response)
          return new Service(picture, location, titre, type, date, description);

        }),
        catchError(error => {
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







  deleteService(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.authService.getToken$().subscribe((token) => {
        httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    });

    return this.http.delete<Service>(`${this.baseUrl}/${id}`, httpOptions)
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
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



}


