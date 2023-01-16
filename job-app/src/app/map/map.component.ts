import { Component, OnInit } from '@angular/core';
import { Map, latLng, MapOptions, marker, Marker, tileLayer} from 'leaflet';
import { defaultIcon } from '../service-map/default-marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  map: Map;

  constructor() { 
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

    this.mapMarkers = [
      marker([ 46.778186, 6.641524 ], { icon: defaultIcon }).bindTooltip('Hello'),
      marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
      marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
    ];
    
  }

  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
 }

  ngOnInit() {
   
  }

}