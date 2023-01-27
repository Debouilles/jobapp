import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


import { Map, latLng, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from '../service-map/default-marker';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ServiceDetailComponent } from '../service-detail/service-detail.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  markerSetup: any[];
  selectedService: any;
  service: any;
  map: Map;
  currentMarker: any;

  constructor(private http: HttpClient, private modalController: ModalController, private cdr: ChangeDetectorRef) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 10,
      center: latLng(46.778186, 6.641524)
    };

    this.mapMarkers = [];
    this.markerSetup = [];


   
  }


  
  async afficheService(service : any) {
    const modal = await this.modalController.create({

      component: ServiceDetailComponent,
      componentProps: {
        data: service
        // pass any props that your create service component needs
      },
      cssClass: 'ModalPage'

    });


    return await modal.present();
  }


  ngOnInit() {

    this.http.get<any>('https://jobapp.onrender.com/services/').subscribe(data => {
      data.data.forEach(service => {


        const newMarker = marker([service.location.coordinates[0], service.location.coordinates[1]], { icon: defaultIcon }).bindTooltip(service.titre).on("click", event => {
          /*   this.openModal(service); */
        });
        this.markerSetup.push({
          marker: newMarker,
          data: service
        })

        this.mapMarkers.push(newMarker);
        // console.log([service.location.coordinates[0], service.location.coordinates[1]])
      });



      this.markerSetup.forEach(markSet => {
        markSet.marker.on("click", event => {
          this.selectedService = markSet.data;
          this.cdr.detectChanges();
        });
      });
      /* console.log(this.mapMarkers) */

    });
  }


  onMapReady(map: Map) {
    this.map = map;
    if (this.mapMarkers.length > 0) {
      this.mapMarkers.forEach(marker => {
        marker.on("click", event => {
          this.currentMarker = marker;
          this.selectedService = event.target.options.data;

          /* this.openModal(event.target.options.data); */
        });

      });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }


  /*   async openModal(data: any) {
    const modal = await this.modalController.create({
      component: ServiceOverlayComponent,
      componentProps: {
        data: data
      }
    });
    return await modal.present();
  } */


}