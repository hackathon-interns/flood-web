import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../ctx-layout/layout/service/loading.service';
import { EntityListAbstract } from '../../../libraries/abstracts';
import { NotificationType } from '../../../libraries/enums';
import { Device, DevicesService } from '../../../api/devices';


@Component({
    selector: 'ctx-faculdade-listar-devices',
    templateUrl: 'listar-devices.component.html',
    standalone: false
})
export class ListarDevicesComponent extends EntityListAbstract implements OnInit {
    @ViewChild('dt') dt!: Table;

    devices!: Device[];
    selectedDevice: Device | null = null;
    selectedDevices: Device[] = [];

    constructor(
        messageService: MessageService,
        loadingService: LoadingService,
        private service: DevicesService
    ) {
        super(messageService, loadingService);
    }

    ngOnInit() {
        this.obterDados();
    }

    onClickAtualizar(): void {
        this.block();
        this.obterDados();
    }

    onClickAdicionar(): void {
        this.adicionarVisible = true;
    }

    onAdicionarVisibleEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onAdicionarSuccessEvent(event: any): void {
        this.adicionarVisible = false;
        this.onClickAtualizar();
    }

    onAdicionarCancelationEvent(event: any): void {
        this.adicionarVisible = false;
    }

    onClickEditar(Device: Device) {
        this.selectedDevice = Device;
        this.editarVisible = true;
    }

    onEditarVisibleEvent(event: any): void {
        this.editarVisible = false;
        this.selectedDevice = null;
    }

    onEditarSuccessEvent(event: any): void {
        this.editarVisible = false;
        this.selectedDevice = null;
    }

    onEditarCancelationEvent(event: any): void {
        this.editarVisible = false;
        this.selectedDevice = null;
    }

    private obterDados(): void {
        this.service.obterTodos().subscribe(
            (res) => {
                this.devices = res;
                this.unlock();
            },
            (error) => {
                this.unlock();
                this.notify(NotificationType.ERROR, error.message);
            }
        );
    }
}