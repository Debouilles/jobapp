import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {
  name: string;
  email: string;
  password: string;
  ngOnInit(): void {

  }

  constructor(private userService: UserService, public Router: Router, public toast: ToastController) {

  }



  async createdUserMessage() {
    const toast = await this.toast.create({
      message: 'Compte créé, veuillez vous <b>Connecter</b>',
      duration: 1500,
      position: 'middle',
      color: 'success',
      cssClass: 'sucess-toaster'
    });

    await toast.present();
  }


  async errorMessage() {
    const toast = await this.toast.create({
      message: 'une Erreur est survenue',
      duration: 1500,
      position: 'middle',
      color: 'danger',
      cssClass: 'sucess-toaster'
    });

    await toast.present();
  }





  onSubmit(form: NgForm) {
    const { name, email, password } = form.value;
    this.userService.createUser(name, email, password).subscribe((response) => {
      console.log(response);
      this.createdUserMessage();
      this.Router.navigate(['/login']);

    },
      (error) => {
        console.error(error);
        this.errorMessage();
      }

    );
  }


}





  // greeting: string;
  // displayedGreeting: string;

  // displayGreeting(form: NgForm) {
  //   if (form.valid) {
  //     this.displayedGreeting = this.greeting;
  //     console.log('Greeting displayed');
  //   }
