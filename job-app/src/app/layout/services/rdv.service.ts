import { Injectable } from '@angular/core';
import { Rdv } from 'src/app/models/rdv';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RdvService {
  baseUrl = 'https://jobapp.onrender.com/rdvs';

  constructor(
    private http: HttpClient
  ) { }

  createRdv(contract: Rdv){
    console.log('hewara')
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log (localStorage.getItem('access_token'))
     this.http.post<Rdv>(this.baseUrl, contract, httpOptions)
      .pipe(
        map(response => {
          console.log("heya")
          // map the response to a User object
          console.log(response)
          // calling the subject's next() method with the updated list of services
          // this.servicesUpdated.next(this.servicesMain);
          return new Rdv(contract);

        }),
        catchError(error => {
          console.log("heyo")
          // handle errors here
          console.log(error);
          return error
        })
      );
  }
}
