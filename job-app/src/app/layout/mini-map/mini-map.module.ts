import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniMapComponent } from './mini-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MiniMapComponent],
  imports: [CommonModule, LeafletModule],
  exports: [MiniMapComponent]
})
export class MiniMapModule { }