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
  validation: any;

  ngOnInit(): void {

  }

  constructor(private userService: UserService, public Router: Router, public toast: ToastController) {
    this.validation = { isFormValid: '', formErrors: '' }
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
    // const { name, email, password } = form.value;
    
    this.validation = this.validateForm(form.value)
    // console.log(this.validation)
    // console.log(this.validation.formErrors['name'])
    // console.log(this.validation.formErrors['password'])
    if (this.validation.isFormValid) {
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



  validateForm(formData: any) {
    let isFormValid = true;
    const formErrors = {};

    if (!formData.name) {
      isFormValid = false;
      formErrors['name'] = 'Veuillez entrer un nom';
      console.log(formErrors['name'])
    } 
    else if (formData.name.length < 5 ) {
      isFormValid = false;
      formErrors['name'] = 'Le nom doit contenir 5 lettres';
    }
    if(!formData.password){
      isFormValid = false;
      formErrors['password'] = 'Veuillez entrer un mot de passe';
    }
   else if (formData.password.length < 3) {
      isFormValid = false;
      formErrors['password'] = 'Le mot de passe doit contenir au moins 3 caractères';
    }
    if (!formData.email) {
      isFormValid = false;
      formErrors['email'] = 'Veuillez entrer votre email';
    } else if (!this.validateEmail(formData.email)) {
      isFormValid = false;
      formErrors['email'] = 'L\'email est d\'un format incorrect';
    }



    return { isFormValid: isFormValid, formErrors: formErrors };
  }


  validateEmail(email: string) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      return true;
    }
    return false;
  }


}





  // greeting: string;
  // displayedGreeting: string;

  // displayGreeting(form: NgForm) {
  //   if (form.valid) {
  //     this.displayedGreeting = this.greeting;
  //     console.log('Greeting displayed');
  //   }
