import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Map, latLng, MapOptions, marker, Marker, tileLayer, LatLng } from 'leaflet';
import { defaultIcon } from '../service-map/default-marker';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss'],
})


export class MiniMapComponent implements OnInit {
  @Input() coords: any;
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  markerSetup: any[];
  selectedService: any;
  // service: any;
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
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };

    this.mapMarkers = [];
    this.markerSetup = [];



  }

  ngOnInit() {
    console.log(this.coords)

    // this.http.get<any>('https://jobapp.onrender.com/services/').subscribe(data => {
    // data.data.forEach(service => {


    //   const newMarker = marker([service.location.coordinates[0], service.location.coordinates[1]], { icon: defaultIcon }).bindTooltip(service.titre).on("click", event => {
    //     /*   this.openModal(service); */
    //   });

    const newMarker = marker([this.coords.coordinates[0], this.coords.coordinates[1]], { icon: defaultIcon })
    this.markerSetup.push({
      marker: newMarker,
      // data: service
    })



    this.mapMarkers.push(newMarker);
    // this.map.setView();
    this.mapOptions.center = latLng([this.coords.coordinates[0], this.coords.coordinates[1]])

    // console.log([service.location.coordinates[0], service.location.coordinates[1]])
    // });



    this.markerSetup.forEach(markSet => {
      
      markSet.marker.on("click", event => {
        this.selectedService = markSet.data;
        this.cdr.detectChanges();
      });
    });
    /* console.log(this.mapMarkers) */

    // });

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
    }, 200);
  }


}
