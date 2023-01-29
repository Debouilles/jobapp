import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PictureService } from 'src/app/picture/picture.service';
import { QimgImage } from 'src/app/models/image';
import { NgForm } from '@angular/forms';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/layout/services/service.service';
import { Geolocation } from '@capacitor/geolocation';
// import { NativeGeocoder } from '@capgo/nativegeocoder';
// import { NativeGeocoderPlugin } from '@capgo/nativegeocoder/dist/esm/definitions';



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
  todaysDate: any;

  //pour test
  latitude: number;
  longitude: number;


  validation: any;

  //
  theTextAdress: any;

  pictureString = "";
  constructor(
    public modalController: ModalController,
    private pictureService: PictureService,
    private ServiceService: ServiceService,
    private toast: ToastController,


    // private formV: FormValidationService
  ) {
    this.validation = { isFormValid: '', formErrors: '' };
    this.todaysDate = new Date().toISOString();
    console.log(this.todaysDate)
  }

  async updateMessage() {
    const toast = await this.toast.create({
      message: 'Service mis-à-jour !',
      duration: 1500,
      position: 'bottom',
      color: 'success',
      cssClass: 'sucess-toaster'
    });

    await toast.present();
  }



  closeModal() {
    this.modalController.dismiss();
  }

  async createdMessage() {
    const toast = await this.toast.create({
      message: 'Service créé !',
      duration: 2500,
      position: 'bottom',
      color: 'success',
      cssClass: 'sucess-toaster'
    });

    await toast.present();
  }



  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe((uploadedImage) => {
      this.pictureString = uploadedImage.url;

    });
  }



  validateUpdateForm(formData: any) {
    let isFormValid = true;
    const formErrors = {};

    if (!formData.titre) {
      //do nothing..
    } else if (formData.titre.length < 3) {
      isFormValid = false;
      formErrors['titre'] = 'Le titre doit contenir au moins 3 caractères';
    }

    if (!formData.description) {

    } else if (formData.description.length < 5 || formData.description.length > 30) {
      isFormValid = false;
      formErrors['description'] = 'La description doit contenir entre 5 et 30 caractères';
    }


    return { isFormValid: isFormValid, formErrors: formErrors };
  }

  validateForm(formData: any) {
    let isFormValid = true;
    const formErrors = {};

    if (!formData.titre) {
      isFormValid = false;
      formErrors['titre'] = 'Veuillez entrer un titre';
    } else if (formData.titre.length < 3) {
      isFormValid = false;
      formErrors['titre'] = 'Le titre doit contenir au moins 3 caractères';
    }
    if (!formData.location) {
      isFormValid = false;
      formErrors['location'] = 'Veuillez entrer votre localisation';
    }
    if (!formData.type) {
      isFormValid = false;
      formErrors['type'] = 'Veuillez entrer le type du service';
    }
    if (!formData.description) {
      isFormValid = false;
      formErrors['description'] = 'Veuillez entrer la description du service';
    } else if (formData.description.length < 5 || formData.description.length > 30) {
      isFormValid = false;
      formErrors['description'] = 'La description doit contenir entre 5 et 30 caractères';
    }


    return { isFormValid: isFormValid, formErrors: formErrors };
  }



  // onViewInit(){

  // }

  // ngModelChange(form: NgForm){
  //  this.validation = this.validateForm(form.value)
  // }

  onSubmit(form: NgForm) {
    console.log(form.value)

    this.validation = this.validateForm(form.value)
    if (!this.validation.isFormValid) {
      console.log("INVALID")
    }
    console.log(this.validation.formErrors['titre'])
    let { titre, type, date, description } = form.value;

    let picture = this.pictureString
    let oneLocation = {
      "type": "Point",
      "coordinates": [this.latitude, this.longitude]
    }

    if (this.serviceToUpdate === undefined) {
      if (date === undefined) {
        date = Date.now();
      }
      if (this.validation.isFormValid) {
        //CREATION-------------------------------------------------
        // console.log("Creating a new service");
        // picture: string, location: object, titre: string, date: Date, type: string, description: string
        this.ServiceService.createService(picture, oneLocation, titre, date, type, description).subscribe((response) => {
          console.log(response);
          this.closeModal();
          this.createdMessage()
        },
          (error) => {
            console.error(error);
          }
        );
        console.log("hello")
      }

    } else if(this.serviceToUpdate){
      //UPDATE-------------------------------------------------
      console.log("Updating an existing service");
      this.validation = this.validateUpdateForm(form.value)
      if (this.validation.isFormValid) {
        this.ServiceService.updateService(this.serviceToUpdate, picture, oneLocation, titre, date, type, description)

        this.closeModal();
        this.updateMessage()
      }

    }
  }


  ngOnInit() {

  }


  ionViewWillEnter() {
    if (this.serviceToUpdate !== undefined) {
      this.picture = this.serviceToUpdate.picture
      this.location = this.serviceToUpdate.location
      this.titre = this.serviceToUpdate.titre
      this.date = this.serviceToUpdate.date
      this.type = this.serviceToUpdate.type
      this.description = this.serviceToUpdate.description
    }
  }


  async requestPermissions() {
    try {
      await Geolocation.requestPermissions();
      this.getCurrentPosition();
    } catch (err) {
      console.log('Error requesting location permissions', err);
    }
  }


  //NOTE: Aucune reverseGeoloc gratuite sans api key, on aurait fait sinon
  //:(

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.location = coordinates;
      this.latitude = coordinates.coords.latitude
      this.longitude = coordinates.coords.longitude
//reverseGeocode
//supprimé

      console.log(this.location)
    } catch (err) {
      console.log('Error getting location', err);
    }
  }
}



