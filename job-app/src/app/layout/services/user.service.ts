import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

import { catchError } from 'rxjs/operators';


// Typescript custom enum for search types (optional)


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://jobapp.onrender.com/users';


  constructor(private http: HttpClient) {


  }


  // createUser(name: string, email: string, password: string ) {
  //   const User = {name, email, password}
  //   return this.http.post(this.baseUrl, User);
  // }

  createUser(name: string, email: string, password: string): Observable<User> {
    const userData = {name, email, password};
    return this.http.post<User>(this.baseUrl, userData)
    .pipe(
        map(response => {
            // map the response to a User object
            console.log(response)
            return new User();
           
        }),
        catchError(error => {
            // handle errors here
            // console.log(error);
            return throwError(error);
        })
    );
}
}
