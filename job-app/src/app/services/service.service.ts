import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../models/service';
import { AuthService } from '../auth/auth.service';

import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = 'https://jobapp.onrender.com/services';
  constructor(private http: HttpClient, private authService: AuthService) { }





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
}


