// main-map.component.ts
import { Component, OnInit, NgZone } from '@angular/core';
import { BaseAbstract } from '../../../libraries/abstracts';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { Device } from '../../../api/devices';
import { DevicesService } from '../../../api/devices';
import { DeviceData } from '../../../api/devices/models/device-data';
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

    /** armazena o reading por device.id */
    private readingsByDevice: Record<string, DeviceData> = {};

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

    private loadDevices() {
        this.loadingService.start();
        this.devicesService.obterTodos().subscribe({
            next: (devices) => {
                this.devices = devices;
                this.createMapLayers();
                this.loadingService.stop();
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dispositivos' });
                this.loadingService.stop();
            }
        });
    }

    private createMapLayers() {
        this.mapLayers = this.devices.map((device) => {
            const marker = L.marker([device.latitude, device.longitude], { icon: this.getMarkerIcon(device) });

            // pop-up inicial (sem dados de leitura ainda)
            marker.bindPopup(this.buildPopupHtml(device), {
                className: 'custom-popup',
                closeButton: true,
                maxWidth: 300
            });

            // quando chegar a leitura, guardamos e atualizamos o popup
            this.devicesService.obterData(device.id).subscribe(
                (reading: DeviceData) => {
                    if (reading) {
                        console.log(reading);
                        this.readingsByDevice[device.id] = reading;
                    }
                    marker.setPopupContent(this.buildPopupHtml(device));
                },
                () => {
                    // opcional: mensagem de erro específica
                }
            );

            marker.on('click', () => this.ngZone.run(() => (this.selectedDevice = device))).on('popupclose', () => this.ngZone.run(() => (this.selectedDevice = null)));

            return marker;
        });
    }

    private getMarkerIcon(device: Device): L.Icon {
        return L.icon({
            iconUrl: '/assets/images/sensor.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -28],
            shadowUrl: '/assets/images/marker-shadow.png',
            shadowSize: [41, 41],
            shadowAnchor: [12, 41]
        });
    }

    private buildPopupHtml(device: Device): string {
        const reading = this.readingsByDevice[device.id];
        return `
  <div class="popup-card">
    <div class="popup-header">
      <span class="popup-title">${device.name}</span>
      <span class="status-badge status-${device.status.toLowerCase()}">${device.status}</span>
    </div>
    <div class="popup-body">
      <div class="popup-row">
        <div class="popup-label">ID</div>
        <div class="popup-value">${device.identifier}</div>
      </div>
      <div class="popup-row">
        <div class="popup-label">Coordenadas</div>
        <div class="popup-value">${device.latitude.toFixed(5)}, ${device.longitude.toFixed(5)}</div>
      </div>
      ${
          reading
              ? `
      <div class="popup-row highlight">
        <div class="popup-label"><i class="icon-water"></i> Distância</div>
        <div class="popup-value">${reading.distance_to_water} cm</div>
      </div>
      <div class="popup-row highlight-alt">
        <div class="popup-label"><i class="icon-rain"></i> Chuva</div>
        <div class="popup-value">${reading.pluviometer_value} mm</div>
      </div>
      `
              : `
      <div class="popup-loading">
        Carregando dados...
      </div>
      `
      }
    </div>
  </div>
  <style>

/* ─── OVERRIDES DO LEAFLET ───────────────────────────────────────────────────── */

/* Remove o fundo branco e borda padrão do popup */
.leaflet-popup-content-wrapper {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  position: relative !important; /* para posicionar o botão de fechar */
}

/* Esconde a “pontinha” do popup */
.leaflet-popup-tip {
  display: none !important;
}

/* Estiliza e posiciona o botão de fechar dentro do wrapper */
.leaflet-popup-close-button {
  position: absolute !important;
  top: 8px !important;
  right: 8px !important;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border-radius: 50%;
  font-size: 16px;
  opacity: 0.8;
  transition: opacity 0.2s;
  z-index: 10;
}

.leaflet-popup-close-button:hover {
  opacity: 1;
}

  /* esconde o X padrão */
.leaflet-popup-close-button {
  display: none !important;
}


/* ─── ESTILOS DO SEU POPUP-CARD ─────────────────────────────────────────────── */

/* Container principal do card */
.popup-card {
  width: 260px;
  background: #fff;
  border: none;           /* já removido pelo override, mas deixado aqui por segurança */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: Arial, sans-serif;
  color: #333;
  overflow: hidden;
}

/* Cabeçalho colorido com título e badge de status */
.popup-header {
  background: #2EAAB0;
  color: #fff;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-title {
  font-weight: bold;
  font-size: 1rem;
}

/* Badge de status, cores baseadas no texto */
.status-badge {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.status-active   { background: #38a169; }  /* ex: Active */
.status-inactive { background: #718096; }  /* ex: Inactive */
.status-error    { background: #e53e3e; }  /* ex: Error */

/* Corpo do popup, com linhas de dados em flex */
.popup-body {
  padding: 12px;
}

.popup-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.popup-label {
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.popup-value {
  font-size: 0.875rem;
}

/* Destaque para valores críticos */
.popup-row.highlight {
  background: #e6f7f8;
  border-radius: 4px;
  padding: 4px 8px;
}

.popup-row.highlight-alt {
  background: #f0f7fa;
  border-radius: 4px;
  padding: 4px 8px;
}

/* Mensagem de loading */
.popup-loading {
  text-align: center;
  font-style: italic;
  padding: 12px;
  color: #666;
}

/* Ícones inline (pode substituir por FontAwesome/Material Icons) */
.icon-water::before {
  content: "💧";
  margin-right: 4px;
}
.icon-rain::before {
  content: "🌧️";
  margin-right: 4px;
}


  </style>
  `;
    }
}
