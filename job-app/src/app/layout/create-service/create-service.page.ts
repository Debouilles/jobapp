import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {
  constructor(public modalController: ModalController) { }
  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
