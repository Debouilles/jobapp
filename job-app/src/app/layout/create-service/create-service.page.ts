import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PictureService } from 'src/app/picture/picture.service';
import { QimgImage } from 'src/app/models/image';
import { NgForm } from '@angular/forms';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/layout/services/service.service';
import { Geolocation } from '@capacitor/geolocation';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';


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


  // form = new FormGroup({
  //   'titre': new FormControl(null, Validators.compose([Validators.required, this.customValidator]))
  // });
  
  // customValidator(control: FormControl): {[s: string]: boolean} {
  //   if (control.value === 'bad') {
  //     return {'isBad': true};
  //   } else if(control.value.length < 5){
  //     return {'minLength': true};
  //   }
  // //   if(control.value.length < 5) {
  // //     return {'minLength': true};
  // // }
  //   return null;
  // }


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
  constructor(public modalController: ModalController, private pictureService: PictureService, private ServiceService: ServiceService, private toast: ToastController) { }

  async updateMessage() {
    const toast = await this.toast.create({
      message: 'Service updated !',
      duration: 1500,
      position: 'middle'
    });

    await toast.present();
  }



  closeModal() {
    this.modalController.dismiss();
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe((uploadedImage) => {
      this.pictureString = uploadedImage.url;

    });
  }


   onSubmit(form: NgForm) {
    // console.log(form.value)DD
    const { titre, type, date, description } = form.value;
    let picture = this.pictureString
    let oneLocation = {
      "type": "Point",
      "coordinates": [this.latitude, this.longitude]
    }
 
    if (this.serviceToUpdate === undefined) {
         //CREATION-------------------------------------------------
      console.log("Creating a new service");
      // picture: string, location: object, titre: string, date: Date, type: string, description: string
      this.ServiceService.createService(picture, oneLocation, titre, date, type, description).subscribe((response) => {
        console.log(response);
        this.closeModal();
      
      },
        (error) => {
          console.error(error);
        }
      );
      console.log("hello")
    } else {
         //UPDATE-------------------------------------------------
      console.log("Updating an existing service");
      this.ServiceService.updateService(this.serviceToUpdate, picture, oneLocation, titre, date, type, description)
      console.log("areYouHere")
      this.closeModal();
      this.updateMessage()

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



