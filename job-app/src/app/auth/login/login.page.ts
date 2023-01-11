import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { AuthRequest } from "../../models/auth-request";
// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { RegistratePage } from "src/app/registrate/registrate.page";
// import { AppRoutingModule } from "src/app/app-routing.module";


// @NgModule({
//   imports: [RouterModule.forRoot(Routes)],
//   exports: [RouterModule]
// })

/**
 * Login page.
 */
@Component({
  templateUrl: "login.page.html",
})
export class LoginPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.authRequest = {
      email: undefined,
      password: undefined,
    };
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    this.auth.logIn$(this.authRequest).subscribe({
      next: () => this.router.navigateByUrl("/"),
      error: (err) => {
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      },
    });
  }
}