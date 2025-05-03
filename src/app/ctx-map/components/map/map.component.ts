import { Component, Input, OnInit } from '@angular/core';

import * as L from 'leaflet';

const baseIcon = L.icon({
  iconUrl: '/assets/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    standalone: false
})
export class MapComponent implements OnInit {
    @Input() layers: L.Layer[];

    ngOnInit(): void {
        if (!this.layers) {
          this.layers = [L.marker([-23.5015, -47.4526]).bindPopup('Estação 1').setIcon(baseIcon)];
        }
    }

    options: L.MapOptions = {
        center: L.latLng(-23.5015, -47.4526),
        zoom: 13,
        layers: [
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            })
        ]
    };
}
