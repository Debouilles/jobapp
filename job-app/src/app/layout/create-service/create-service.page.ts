import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PictureService } from 'src/app/picture/picture.service';
import { QimgImage } from 'src/app/models/image';


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

  takePicture(){

  }

  ngOnInit() {
  }

}
