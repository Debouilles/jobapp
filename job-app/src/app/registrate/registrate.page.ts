import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {
 ngOnInit(): void {
   
 }
  greeting: string;
  displayedGreeting: string;

  displayGreeting(form: NgForm) {
    if (form.valid) {
      this.displayedGreeting = this.greeting;
      console.log('Greeting displayed');
    }


}
}