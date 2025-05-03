import { Component } from '@angular/core';
import { BaseAbstract } from '../../../libraries/abstracts';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { WaterLevelStatus } from '../../enums';

@Component({
    selector: 'app-main-map',
    templateUrl: './main-map.component.html',
    styleUrls: ['./main-map.component.scss'],
    standalone: false
})
export class MainMapComponent extends BaseAbstract {
    devices: any[] = mockData;
    selectedDevice: any = mockData[0];

    constructor(messageService: MessageService, loadingService: LoadingService) {
        super(messageService, loadingService);
    }
}

const mockData = [
    {
        id: 1,
        name: 'Estação 1',
        latitude: -23.5505,
        longitude: -47.60013,
        address: 'Rua Teste, 123 | Sorocaba/SP',
        waterLevelStatus: WaterLevelStatus.Normal
    }
];
