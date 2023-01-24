import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
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

  constructor(private userService: UserService) {

  }

  onSubmit(form: NgForm) {
    const { name, email, password } = form.value;
    this.userService.createUser(name, email, password).subscribe((response) => {
      console.log(response);

    },
      (error) => {
        console.error(error);
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
