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
  picture = "";
  constructor(public modalController: ModalController, private pictureService: PictureService) { }
  closeModal() {
    this.modalController.dismiss();
  }

  takePicture(){
    this.pictureService.takeAndUploadPicture().subscribe((uploadedImage) => {
      this.picture = uploadedImage.url;
    });
  }

  ngOnInit() {
  }

}
