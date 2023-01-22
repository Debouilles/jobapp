import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PictureService } from 'src/app/picture/picture.service';
import { QimgImage } from 'src/app/models/image';
import { NgForm } from '@angular/forms';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {
  picture: string;
  location: object;
  titre: string;
  date: Date;
  type: string;
  description: string;


  pictureString = "";
  constructor(public modalController: ModalController, private pictureService: PictureService, private ServiceService: ServiceService) { }
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
    const {titre, type, date, description} = form.value;
    let picture =  this.pictureString
    let oneLocation = {
      "type": "Point",
      "coordinates": [ -72.856077, 40.848447 ]
    }
    // picture: string, location: object, titre: string, date: Date, type: string, description: string
    this.ServiceService.createService(picture, oneLocation, titre, date, type, description).subscribe((response) => {
      console.log(response);

    },
      (error) => {
        console.error(error);
      }

    );

    console.log("hello")
  }


  ngOnInit() {
  }

}



// export class RegistratePage implements OnInit {
//   name: string;
//   email: string;
//   password: string;
//   ngOnInit(): void {

//   }

//   constructor(private userService: UserService) {

//   }

//   onSubmit(form: NgForm) {
//     const { name, email, password } = form.value;
//     this.userService.createUser(name, email, password).subscribe((response) => {
//       console.log(response);

//     },
//       (error) => {
//         console.error(error);
//       }

//     );
//   }


// }

