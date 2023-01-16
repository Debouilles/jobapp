import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-overlay',
  templateUrl: './service-overlay.component.html',
  styleUrls: ['./service-overlay.component.scss'],
})
export class ServiceOverlayComponent implements OnInit {

  @Input() data: any;
  titre: string;
  type: string;
  date: string;

  constructor() { }

  ngOnInit() {
    this.titre = this.data.titre;
    this.type = this.data.type;
    this.date = this.data.date;
  }

}
