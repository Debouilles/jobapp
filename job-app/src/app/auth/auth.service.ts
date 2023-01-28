import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthResponse } from "../models/auth-response";
import { User } from "../models/user";
import { AuthRequest } from "../models/auth-request";

import { Observable, ReplaySubject, from } from "rxjs";
import { delayWhen, map } from "rxjs/operators";
import { Storage } from "@ionic/storage";

const API_URL = "https://jobapp.onrender.com";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    // Emit an empty value on startup for now
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.#auth$.next(auth);
    });
  }


  
  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  getUser$(): Observable<User> {
    return this.#auth$.pipe(map((auth) => auth?.user));
  }

  getToken$(): Observable<string> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.saveAuth$(auth)),
      map((auth) => {
        localStorage.setItem('access_token', auth.token);
        localStorage.setItem('user_id', auth.user._id);
        this.#auth$.next(auth);
        console.log(`User ${auth.user.name} logged in`);
        return auth.user;
      })
    );
  }

  logOut() {
    this.#auth$.next(null);
    // Remove the stored authentication from storage when logging out.
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    this.storage.remove('auth');
    console.log('User logged out');
    
  }

  private saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }
}