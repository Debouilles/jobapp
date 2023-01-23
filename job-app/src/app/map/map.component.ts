import { Component, OnInit } from '@angular/core';


import { Map, latLng, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { defaultIcon } from '../service-map/default-marker';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  markerSetup: any[];

  map: Map;
  currentMarker: any;

  constructor(private http: HttpClient, private modalController: ModalController) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };

    // this.mapMarkers = [
    //   marker([ 46.778186, 6.641524 ], { icon: defaultIcon }).bindTooltip('Hello'),
    //   marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
    //   marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
    // ];
    this.mapMarkers = [];
    this.markerSetup = [];

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


      this.markerSetup.forEach(markSet =>{
      console.log(markSet)
      markSet.marker.on("click", event=>{
        console.log(event)
        this.markerSetup = markSet
        console.log(this.markerSetup)
      })
      })

      


      /* console.log(this.mapMarkers) */
      this.mapMarkers.forEach(marker => {
       marker.on("click", (event) => {
        this.currentMarker = marker;
        console.log(this.currentMarker)
       })
      });
    });
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

  onMapReady(map: Map) {
    this.map = map;
    if (this.mapMarkers.length > 0) {
      this.mapMarkers.forEach(marker => {
        marker.on("click", event => {
          this.currentMarker = marker;
          /* this.openModal(event.target.options.data); */
        });

      });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }



}