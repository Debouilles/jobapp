import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PictureService } from 'src/app/picture/picture.service';
import { QimgImage } from 'src/app/models/image';
import { NgForm } from '@angular/forms';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/layout/services/service.service';
import { Geolocation } from '@capacitor/geolocation';

// const printCurrentPosition = async () => {
//   const coordinates = await Geolocation.getCurrentPosition();

//   console.log('Current position:', coordinates);
// };


@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  @Input() serviceToUpdate: any;

  picture: string;
  location: any;
  titre: string;
  date: Date;
  type: string;
  description: string;

  //pour test
  latitude: number;
  longitude: number;


  pictureString = "";
  constructor(public modalController: ModalController, private pictureService: PictureService, private ServiceService: ServiceService) { }



  // async printCurrentPosition() {
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   this.location = coordinates
  //   console.log('Current position:', coordinates);
  //   return coordinates;
  // }

  closeModal() {
    this.modalController.dismiss();
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe((uploadedImage) => {
      this.pictureString = uploadedImage.url;

    });
  }


  onSubmit(form: NgForm) {
    console.log(form.value)
    const { titre, type, date, description } = form.value;
    let picture = this.pictureString
    let oneLocation = {
      "type": "Point",
      "coordinates": [this.latitude, this.longitude]
    }



    if (this.serviceToUpdate === undefined) {
      console.log("Creating a new service");
      // picture: string, location: object, titre: string, date: Date, type: string, description: string
      this.ServiceService.createService(picture, oneLocation, titre, date, type, description).subscribe((response) => {
        console.log(response);

      },
        (error) => {
          console.error(error);
        }

      );
      console.log("hello")
    } else {
      console.log("Updating an existing service");

    }


  }


  ngOnInit() {
    // this.requestPermissions();
    console.log(this.serviceToUpdate)
  }

  async requestPermissions() {
    try {
      await Geolocation.requestPermissions();
      this.getCurrentPosition();
    } catch (err) {
      console.log('Error requesting location permissions', err);
    }
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.location = coordinates;
      this.latitude = coordinates.coords.latitude
      this.longitude = coordinates.coords.longitude
      console.log(this.location)
    } catch (err) {
      console.log('Error getting location', err);
    }
  }
}



