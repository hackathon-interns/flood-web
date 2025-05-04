import { Component, OnInit, NgZone } from '@angular/core';
import { BaseAbstract } from '../../../libraries/abstracts';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { WaterLevelStatus } from '../../enums';
import { Device } from '../../../api/devices';
import { DevicesService } from '../../../api/devices';

import * as L from 'leaflet';

@Component({
    selector: 'app-main-map',
    templateUrl: './main-map.component.html',
    styleUrls: ['./main-map.component.scss'],
    standalone: false
})
export class MainMapComponent extends BaseAbstract implements OnInit {
    devices: Device[] = [];
    selectedDevice: Device | null = null;
    mapLayers: L.Layer[] = [];
    
    constructor(
        messageService: MessageService, 
        loadingService: LoadingService, 
        private devicesService: DevicesService,
        private ngZone: NgZone
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        this.loadDevices();
    }

    loadDevices() {
        this.loadingService.start();
        this.devicesService.obterTodos().subscribe({
            next: (devices) => {
                this.devices = devices;
                this.createMapLayers();
                this.loadingService.stop();
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao carregar dispositivos'
                });
                this.loadingService.stop();
            }
        });
    }

    createMapLayers() {
        this.mapLayers = this.devices.map(device => {
            const marker = L.marker([device.latitude, device.longitude])
                .bindPopup(device.name)
                .setIcon(this.getMarkerIcon(device));
            
            marker.on('click', () => {
                this.ngZone.run(() => {
                    this.selectedDevice = device;
                });
            });

            marker.on('popupclose', () => {
                this.ngZone.run(() => {
                  this.selectedDevice = null;
                });
            });
            
            return marker;
        });
    }

    getMarkerIcon(device: any) {
        const baseIcon = L.icon({
            iconUrl: '/assets/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        return baseIcon;
    }
}