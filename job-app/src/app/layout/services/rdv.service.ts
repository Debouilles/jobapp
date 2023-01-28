import { Injectable } from '@angular/core';
import { Rdv } from 'src/app/models/rdv';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RdvService {
  baseUrl = 'https://jobapp.onrender.com/rdvs';
  // isAlive = false;
  // isWaiting = false;

  constructor(
    private http: HttpClient
  ) { }

  //  createRdv(contract: Rdv){
  //   console.log('hewara')
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   };
  //   httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  //   console.log (localStorage.getItem('access_token'))
  //    return this.http.post<Rdv>(this.baseUrl, contract, httpOptions)
  //     .pipe(
  //       map(response => {
  //         console.log("heya")
  //         // map the response to a User object
  //         console.log(response)
  //         // calling the subject's next() method with the updated list of services
  //         // this.servicesUpdated.next(this.servicesMain);
  //         return new Rdv();

  //       }),
  //       catchError(error => {
  //         console.log("heyo")
  //         // handle errors here
  //         console.log(error);
  //         return error
  //       })
  //     );
  // }

  getRdvs(): Observable<Rdv[]> {
    let httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    return this.http.get<Rdv[]>(this.baseUrl, httpOptions)
        .pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
}


deleteRdv(id: string): Observable<Rdv> {
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

  return this.http.delete<any>(`${this.baseUrl}/${id}`, httpOptions)
    .pipe(
      catchError(error => {
        // handle errors here
        // console.log(error);
        return throwError(error);
      })
    );
}



  checkIfIsAlive(serviceId){
    //note marche pas si en fonction °\__O__/°
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log("SERVICEID:"+serviceId)
    return this.http.get<Rdv>(this.baseUrl+"/service/"+serviceId, httpOptions)
    .pipe(
        map(response => {
          console.log(response)
            // map the response to a User object
            // console.log(response)
            // this.isAlive = true
            // this.isWaiting= true;
            return response
           
           
        }),
        catchError(error => {
            // handle errors here
            console.log(error);
          // this.isWaiting = false;
            return throwError(error);
        })
    );
  }

  createRdv(contract: any): Observable<Rdv> {
        let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log (localStorage.getItem('access_token'))
   
    return this.http.post<Rdv>(this.baseUrl, contract, httpOptions)
    .pipe(
        map(response => {
            // map the response to a User object
            console.log(response)
            return new Rdv();
           
        }),
        catchError(error => {
            // handle errors here
            // console.log(error);

            return throwError(error);
        })
    );
}


updateRdv(rdvId: string, updatedRdv: any): Observable<Rdv> {
  let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  console.log(localStorage.getItem('access_token'))

  return this.http.put<Rdv>(`${this.baseUrl}/${rdvId}`, updatedRdv, httpOptions)
      .pipe(
          map(response => {
              // map the response to a User object
              console.log(response)
              return new Rdv();

          }),
          catchError(error => {
              // handle errors here
              // console.log(error);

              return throwError(error);
          })
      );
}
}
